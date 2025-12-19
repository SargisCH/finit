package main

import (
	"archive/tar"
	"compress/gzip"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"time"
)
func stringPtr(s string) *string {
	return &s
}

const (
	logFolder = "./logs" // Log files location
	port      = "8090"
)

type ProjectConfig struct {
	Folder         string
	DistFile       string
	ModulesFile    *string
	PM2ProcessName string
	EcosystemFile  string
}

var projects = map[string]ProjectConfig{
	"finit-backend": {
		Folder:         "/home/sargis/projects/finit/builds/backend",
		DistFile:       "dist.tar.gz",
    ModulesFile:    stringPtr("server_modules.tar.gz"),
		PM2ProcessName: "finit-backend",
		EcosystemFile:  "ecosystem.config.js",
	},
	"finit-frontend": {
		Folder:         "/home/sargis/projects/finit/builds/frontend",
		DistFile:       "dist.tar.gz",
		PM2ProcessName: "finit-frontend",
		EcosystemFile:  "ecosystem.config.js",
	},
	// Add more projects here
}

var logger *log.Logger

func main() {
	// Ensure log directory exists
	if err := os.MkdirAll(logFolder, 0755); err != nil {
		log.Fatalf("Failed to create log directory: %v", err)
	}

	// Initial logger setup (will log to console only until first deployment)
	logger = log.New(os.Stdout, "", log.LstdFlags)

	http.HandleFunc("/deploy/", deployHandler)
	http.HandleFunc("/projects", projectsListHandler)
	http.HandleFunc("/logs", logsListHandler)
	http.HandleFunc("/logs/", logFileHandler)

	logger.Printf("Server starting on port %s...", port)
	logger.Printf("Available projects: %v", getProjectNames())
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func getProjectNames() []string {
	names := make([]string, 0, len(projects))
	for name := range projects {
		names = append(names, name)
	}
	return names
}

func deployHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract project name from URL: /deploy/{project-name}
	projectName := filepath.Base(r.URL.Path)
	if projectName == "deploy" || projectName == "" {
		http.Error(w, "Project name required. Use /deploy/{project-name}", http.StatusBadRequest)
		return
	}

	// Get project configuration
	config, exists := projects[projectName]
	if !exists {
		http.Error(w, fmt.Sprintf("Project '%s' not found. Available projects: %v", projectName, getProjectNames()), http.StatusNotFound)
		return
	}

	// Rotate log file on each deployment
	if err := rotateLogFile(projectName); err != nil {
		http.Error(w, fmt.Sprintf("Failed to rotate log file: %v", err), http.StatusInternalServerError)
		return
	}

	logger.Println("========================================")
	logger.Printf("Deployment triggered for project: %s", projectName)

	// Step 1: Unzip dist tar.gz
	tarGzPath := filepath.Join(config.Folder, config.DistFile)
  
	if err := extractTarGz(tarGzPath, config.Folder); err != nil {
		logger.Printf("Error extracting tar.gz: %v", err)
		http.Error(w, fmt.Sprintf("Failed to extract: %v", err), http.StatusInternalServerError)
		return
	}
	logger.Printf("Successfully extracted %s", config.DistFile)
  if config.ModulesFile != nil {
  	modulesPath := filepath.Join(config.Folder, *config.ModulesFile)
  	if err := extractTarGz(modulesPath, config.Folder); err != nil {
  		logger.Printf("Error extracting modules: %v", err)
  	}
	  logger.Printf("Successfully extracted modules %s", config.ModulesFile)
  }

	// Step 2: PM2 delete process
	if err := runCommand("pm2", "delete", config.PM2ProcessName); err != nil {
		logger.Printf("Warning: pm2 delete failed (process might not exist): %v", err)
		// Don't fail here - process might not exist
	}
	logger.Printf("Executed pm2 delete %s", config.PM2ProcessName)

	// Step 3: PM2 start ecosystem.config.js
	// ecosystemPath := filepath.Join(config.Folder, config.EcosystemFile)
	// if err := runCommandInDir(config.Folder, "pm2", "start", ecosystemPath); err != nil {
	// 	logger.Printf("Error starting pm2: %v", err)
	// 	http.Error(w, fmt.Sprintf("Failed to start pm2: %v", err), http.StatusInternalServerError)
	// 	return
	// }
	// logger.Printf("Successfully started pm2 with %s", config.EcosystemFile)
	logger.Println("Deployment completed successfully!")
	logger.Println("========================================")

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Deployment completed successfully for project: %s\n", projectName)
}

func projectsListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprintf(w, "<html><head><title>Available Projects</title>")
	fmt.Fprintf(w, "<style>body{font-family:Arial,sans-serif;margin:40px;background:#f5f5f5;}")
	fmt.Fprintf(w, "h1{color:#333;}table{width:100%%;border-collapse:collapse;background:white;box-shadow:0 2px 4px rgba(0,0,0,0.1);}")
	fmt.Fprintf(w, "th,td{padding:15px;text-align:left;border-bottom:1px solid #ddd;}")
	fmt.Fprintf(w, "th{background:#0066cc;color:white;}")
	fmt.Fprintf(w, "tr:hover{background:#f5f5f5;}")
	fmt.Fprintf(w, ".deploy-btn{background:#28a745;color:white;padding:8px 16px;border:none;border-radius:4px;cursor:pointer;text-decoration:none;display:inline-block;}")
	fmt.Fprintf(w, ".deploy-btn:hover{background:#218838;}")
	fmt.Fprintf(w, "a.logs-link{color:#0066cc;text-decoration:none;margin-left:20px;}")
	fmt.Fprintf(w, "</style>")
	fmt.Fprintf(w, "</head><body>")
	fmt.Fprintf(w, "<h1>Available Projects</h1>")
	fmt.Fprintf(w, "<a href='/logs' class='logs-link'>View All Logs</a>")
	fmt.Fprintf(w, "<br><br><table>")
	fmt.Fprintf(w, "<tr><th>Project Name</th><th>Folder</th><th>PM2 Process</th><th>Action</th></tr>")

	for name, config := range projects {
		fmt.Fprintf(w, "<tr>")
		fmt.Fprintf(w, "<td><strong>%s</strong></td>", name)
		fmt.Fprintf(w, "<td>%s</td>", config.Folder)
		fmt.Fprintf(w, "<td>%s</td>", config.PM2ProcessName)
		fmt.Fprintf(w, "<td><a href='/deploy/%s' class='deploy-btn'>Deploy</a></td>", name)
		fmt.Fprintf(w, "</tr>")
	}

	fmt.Fprintf(w, "</table></body></html>")
}

func rotateLogFile(projectName string) error {
	// Create new log file with timestamp and project name
	timestamp := time.Now().Format("2006-01-02_15-04-05")
	logFileName := filepath.Join(logFolder, fmt.Sprintf("%s_deploy_%s.log", projectName, timestamp))

	logFile, err := os.OpenFile(logFileName, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		return fmt.Errorf("failed to open log file: %w", err)
	}

	// Create multi-writer to write to both file and console
	multiWriter := io.MultiWriter(os.Stdout, logFile)

	// Update global logger
	logger = log.New(multiWriter, "", log.LstdFlags)

	logger.Printf("Log file created: %s", logFileName)

	return nil
}

func extractTarGz(tarGzPath, destDir string) error {
	file, err := os.Open(tarGzPath)
	if err != nil {
		return fmt.Errorf("failed to open tar.gz: %w", err)
	}
	defer file.Close()

	gzr, err := gzip.NewReader(file)
	if err != nil {
		return fmt.Errorf("failed to create gzip reader: %w", err)
	}
	defer gzr.Close()

	tr := tar.NewReader(gzr)

	fileCount := 0
	dirCount := 0

	for {
		header, err := tr.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to read tar: %w", err)
		}

		// Security check: prevent path traversal
		target := filepath.Join(destDir, header.Name)
		if !filepath.HasPrefix(target, filepath.Clean(destDir)+string(os.PathSeparator)) {
			return fmt.Errorf("illegal file path: %s", header.Name)
		}

		switch header.Typeflag {
		case tar.TypeDir:
			if err := os.MkdirAll(target, os.FileMode(header.Mode)); err != nil {
				return fmt.Errorf("failed to create directory %s: %w", target, err)
			}
			dirCount++
			
		case tar.TypeReg:
			// Ensure parent directory exists
			if err := os.MkdirAll(filepath.Dir(target), 0755); err != nil {
				return fmt.Errorf("failed to create parent directory: %w", err)
			}
			
			// Create the file
			outFile, err := os.OpenFile(target, os.O_CREATE|os.O_RDWR|os.O_TRUNC, os.FileMode(header.Mode))
			if err != nil {
				return fmt.Errorf("failed to create file %s: %w", target, err)
			}
			
			// Copy content
			if _, err := io.Copy(outFile, tr); err != nil {
				outFile.Close()
				return fmt.Errorf("failed to write file %s: %w", target, err)
			}
			outFile.Close()
			fileCount++
			
		case tar.TypeSymlink:
			// Handle symlinks (common in node_modules)
			if err := os.MkdirAll(filepath.Dir(target), 0755); err != nil {
				return fmt.Errorf("failed to create parent directory for symlink: %w", err)
			}
			
			// Remove existing file/symlink if it exists
			os.Remove(target)
			
			if err := os.Symlink(header.Linkname, target); err != nil {
				logger.Printf("Warning: failed to create symlink %s -> %s: %v", target, header.Linkname, err)
				// Don't fail on symlink errors, just log and continue
			}
		}
	}

	logger.Printf("Extracted %d files and %d directories", fileCount, dirCount)
	return nil
}

func runCommand(name string, args ...string) error {
	cmd := exec.Command(name, args...)
	cmd.Stdout = logger.Writer()
	cmd.Stderr = logger.Writer()
	return cmd.Run()
}

func runCommandInDir(dir, name string, args ...string) error {
	cmd := exec.Command(name, args...)
	cmd.Dir = dir
	cmd.Stdout = logger.Writer()
	cmd.Stderr = logger.Writer()
	return cmd.Run()
}

func logsListHandler(w http.ResponseWriter, r *http.Request) {
	files, err := os.ReadDir(logFolder)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to read logs: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	fmt.Fprintf(w, "<html><head><title>Deployment Logs</title>")
	fmt.Fprintf(w, "<style>body{font-family:Arial,sans-serif;margin:40px;background:#f5f5f5;}")
	fmt.Fprintf(w, "h1{color:#333;}ul{list-style:none;padding:0;}")
	fmt.Fprintf(w, "li{background:white;margin:10px 0;padding:15px;border-radius:5px;box-shadow:0 2px 4px rgba(0,0,0,0.1);}")
	fmt.Fprintf(w, "a{color:#0066cc;text-decoration:none;font-size:16px;}")
	fmt.Fprintf(w, "a:hover{text-decoration:underline;}")
	fmt.Fprintf(w, ".back-link{display:inline-block;margin-bottom:20px;}</style>")
	fmt.Fprintf(w, "</head><body>")
	fmt.Fprintf(w, "<a href='/projects' class='back-link'>← Back to projects</a>")
	fmt.Fprintf(w, "<h1>Deployment Logs</h1>")
	fmt.Fprintf(w, "<ul>")

	// Reverse order to show newest first
	for i := len(files) - 1; i >= 0; i-- {
		file := files[i]
		if !file.IsDir() && filepath.Ext(file.Name()) == ".log" {
			fmt.Fprintf(w, "<li><a href='/logs/%s'>%s</a></li>", file.Name(), file.Name())
		}
	}

	fmt.Fprintf(w, "</ul></body></html>")
}

func logFileHandler(w http.ResponseWriter, r *http.Request) {
	// Extract filename from URL path
	filename := filepath.Base(r.URL.Path)

	// Security: prevent directory traversal
	if filename == "." || filename == ".." || filepath.Dir(r.URL.Path) != "/logs" {
		http.Error(w, "Invalid log file", http.StatusBadRequest)
		return
	}

	logPath := filepath.Join(logFolder, filename)

	// Check if file exists and is a .log file
	if filepath.Ext(filename) != ".log" {
		http.Error(w, "Invalid log file", http.StatusBadRequest)
		return
	}

	content, err := os.ReadFile(logPath)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to read log file: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	fmt.Fprintf(w, "<html><head><title>%s</title>", filename)
	fmt.Fprintf(w, "<style>body{font-family:monospace;margin:20px;background:#1e1e1e;color:#d4d4d4;}")
	fmt.Fprintf(w, "pre{background:#2d2d2d;padding:20px;border-radius:5px;overflow-x:auto;line-height:1.5;}")
	fmt.Fprintf(w, "a{color:#4fc3f7;text-decoration:none;margin-bottom:10px;display:inline-block;}")
	fmt.Fprintf(w, "a:hover{text-decoration:underline;}</style>")
	fmt.Fprintf(w, "</head><body>")
	fmt.Fprintf(w, "<a href='/logs'>← Back to logs list</a>")
	fmt.Fprintf(w, "<h2>%s</h2>", filename)
	fmt.Fprintf(w, "<pre>%s</pre>", string(content))
	fmt.Fprintf(w, "</body></html>")
}
