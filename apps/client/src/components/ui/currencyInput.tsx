import { Field, NumberInput } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { Trans } from "react-i18next";
import { currencyFormat } from "../../utils";
import { useState } from "react";

type Props = {
  error: boolean;
  label: string;
  helperText?: string;
  name: string;
  control: any;
};

const FORMAT_OPTIONS: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "AMD",
  currencyDisplay: "code",
};
// const parseCurrency = (val: string) => {
//   return val.replace(/[^0-9.-]/g, "");
// };
export default function CurrencyInput({
  error,
  label,
  helperText,
  name,
  control,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  // onChange={(e) => {
  //                   const parsed = parseCurrency(e.target.value);
  //                   onChange(parsed ? parseFloat(parsed).toString() : "");
  //                 }}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const displayValue = isFocused ? value : currencyFormat(value);
        return (
          <Field.Root invalid={error}>
            <Field.Label>{label}</Field.Label>
            <Field.HelperText visibility={!helperText ? "hidden" : ""}>
              {helperText || "placeholder text"}
            </Field.HelperText>
            <NumberInput.Root
              formatOptions={FORMAT_OPTIONS}
              max={Number.MAX_SAFE_INTEGER}
              min={Number.MIN_SAFE_INTEGER}
            >
              <NumberInput.Input
                width={"sm"}
                mt={2}
                value={displayValue}
                onChange={(e) => onChange(Number(e.target.value))}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </NumberInput.Root>
            <Field.ErrorText>
              <Trans i18nKey="errors.requiredField" />
            </Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
}
