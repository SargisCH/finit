import {
  Field,
  Flex,
  Input,
  InputGroup,
  NumberInput,
  Span,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { Trans } from "react-i18next";
import { currencyFormat } from "../../utils";
import { ChangeEvent, useState } from "react";

type Props = {
  error: boolean;
  label: string;
  helperText?: string;
  name: string;
  control: any;
  placeholder?: string;
  int?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  size?: string;
};

const FORMAT_OPTIONS: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "AMD",
};
// const parseCurrency = (val: string) => {
//   return val.replace(/[^0-9.-]/g, "");
// };
// export default function CurrencyInput({
//   error,
//   label,
//   helperText,
//   name,
//   control,
//   placeholder,
//   int,
// }: Props) {
//   const [isFocused, setIsFocused] = useState(false);
//   // onChange={(e) => {
//   //                   const parsed = parseCurrency(e.target.value);
//   //                   onChange(parsed ? parseFloat(parsed).toString() : "");
//   //                 }}
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value = "" } }) => {
//         console.log("int", int);
//         const displayValue = isFocused ? value : currencyFormat(value);
//         console.log("display", name, currencyFormat(value));
//         return (
//           <Field.Root invalid={error}>
//             <Field.Label>{label}</Field.Label>
//             <Field.HelperText visibility={!helperText ? "hidden" : ""}>
//               {helperText || "placeholder text"}
//             </Field.HelperText>
//             <NumberInput.Root
//               max={Number.MAX_SAFE_INTEGER}
//               min={Number.MIN_SAFE_INTEGER}
//             >
//               <InputGroup
//                 startElement={
//                   <Flex alignItems="center" pt={2}>
//                     <Span color="black">AMD</Span>
//                   </Flex>
//                 }
//               >
//                 <NumberInput.Input
//                   width={"sm"}
//                   paddingLeft={"50px !important"}
//                   mt={2}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   onChange={(e) => onChange(e.target.value)}
//                   value={value}
//                   placeholder={placeholder}
//                   color="currentcolor"
//                   _placeholder={{ opacity: 1, color: "gray.500" }}
//                   // In v3, you can use the 'css' prop to debug
//                   css={{
//                     "&": {
//                       color: "red !important", // If you see red text on blur, it's a color issue
//                       padding: "10px !important", // If you see text move, it's a padding/layout issue
//                     },
//                   }}
//                 />
//               </InputGroup>
//             </NumberInput.Root>
//             <Field.ErrorText>
//               <Trans i18nKey="errors.requiredField" />
//             </Field.ErrorText>
//           </Field.Root>
//         );
//       }}
//     />
//   );
// }
//

const CurrencyInput = ({
  isDisabled,
  isInvalid,
  size = "md",
  label,
  control,
  placeholder,
  error,
  helperText,
  name,
  int,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses: { [key: string]: string } = {
    sm: "text-sm h-8",
    md: "text-base h-10",
    lg: "text-lg h-12",
  };

  // Format number with commas and proper decimal places
  const formatCurrency = (num: string) => {
    if (!num) return "";

    // Remove all non-numeric characters except decimal point
    const cleanNum = num.toString().replace(/[^\d.]/g, "");

    // Split into integer and decimal parts
    const parts = cleanNum.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Add thousand separators
    const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine with decimal part if it exists
    return decimalPart !== undefined && !int
      ? `${formatted}.${decimalPart}`
      : formatted;
  };

  // Parse formatted string back to raw number
  // const parseFormattedValue = (formatted: string) => {
  //   return formatted.replace(/,/g, "");
  // };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: string | number) => void,
  ) => {
    const input = e.target.value;

    // Remove commas for processing
    const withoutCommas = input.replace(/,/g, "");

    // Allow only numbers and one decimal point
    const filtered = withoutCommas.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point and max 2 decimal places
    const parts = filtered.split(".");
    let result = parts[0];
    if (!int && parts.length > 1) {
      // Limit to 2 decimal places
      result = parts[0] + "." + parts[1].slice(0, 2);
    }

    onChange(Number(result));
  };

  const handleBlur = (
    value: string,
    onChange: (value: string | number) => void,
  ) => {
    setIsFocused(false);

    // Format to 2 decimal places on blur if there's a value
    if (int) {
      return;
    }
    if (value && !value.includes(".")) {
      onChange(value + ".00");
    } else if (value && value.includes(".")) {
      const parts = value.split(".");
      if (parts[1].length === 1) {
        onChange(value + "0");
      }
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const displayValue = isFocused
          ? value.toString()
          : formatCurrency(value);
        return (
          <Field.Root invalid={error}>
            <Field.Label>{label}</Field.Label>
            <Field.HelperText visibility={!helperText ? "hidden" : ""}>
              {helperText || "placeholder text"}
            </Field.HelperText>

            <InputGroup startElement="AMD" mr={2}>
              <Input
                type="text"
                pl="50px !important"
                inputMode={!int ? "decimal" : "none"}
                value={displayValue}
                onChange={(e) => handleInputChange(e, onChange)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => handleBlur(value.toString(), onChange)}
                placeholder={placeholder}
                disabled={isDisabled}
              />
            </InputGroup>
            <Field.ErrorText>
              <Trans i18nKey="errors.requiredField" />
            </Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};
export default CurrencyInput;
// <input
//                   type="text"
//                   inputMode="decimal"
//                   value={displayValue}
//                   onChange={(e) => handleInputChange(e, onChange)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => handleBlur(value, onChange)}
//                   placeholder={placeholder}
//                   disabled={isDisabled}
//                   className={`
//             flex-1 px-3 outline-none bg-transparent
//             ${isDisabled ? "cursor-not-allowed" : ""}
//           `}
//
// />
