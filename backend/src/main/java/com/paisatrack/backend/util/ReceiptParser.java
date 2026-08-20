package com.paisatrack.backend.util;

import com.paisatrack.backend.dto.ReceiptScanResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ReceiptParser {

    private ReceiptParser() {
    }

    public static ReceiptScanResponse parse(String text) {

        return ReceiptScanResponse.builder()
                .merchant(findMerchant(text))
                .amount(findAmount(text))
                .gst(findGST(text))
                .date(findDate(text))
                .paymentMode(findPaymentMode(text))
                .category(findCategory(text))
                .extractedText(text)
                .build();

    }

    private static String findMerchant(String text) {

        String[] lines = text.split("\\R");

        for (String line : lines) {

            line = line.trim();

            if (line.length() > 3 &&
                    !line.matches(".*\\d{4,}.*")) {

                return line;

            }

        }

        return "Unknown";

    }

    private static BigDecimal findAmount(String text) {

        Pattern numberPattern = Pattern.compile("\\d+[\\.,]?\\d{0,2}");

        BigDecimal highest = BigDecimal.ZERO;

        String[] lines = text.split("\\R");

        for (String line : lines) {

            String lower = line.toLowerCase();

            if (lower.contains("total") ||
                    lower.contains("tota") ||
                    lower.contains("ota") ||
                    lower.contains("grand")) {

                Matcher matcher = numberPattern.matcher(line);

                while (matcher.find()) {

                    try {

                        BigDecimal value = new BigDecimal(
                                matcher.group().replace(",", "")
                        );

                        if (value.compareTo(highest) > 0) {

                            highest = value;

                        }

                    } catch (Exception ignored) {
                    }

                }

            }

        }

        return normalizeAmount(highest);

    }
    private static BigDecimal normalizeAmount(BigDecimal value) {

        if (value == null) {
            return BigDecimal.ZERO;
        }

        /*
        * OCR sometimes removes the decimal point.
        *
        * 45030  -> 450.30
        * 398600 -> 3986.00
        */

        if (value.scale() == 0 && value.compareTo(new BigDecimal("1000")) > 0) {

            return value.divide(
                    new BigDecimal("100"),
                    2,
                    java.math.RoundingMode.HALF_UP
            );

        }

        return value;

    }

    private static BigDecimal findGST(String text) {

        Pattern numberPattern = Pattern.compile("\\d+[\\.,]?\\d{0,2}");

        String[] lines = text.split("\\R");

        BigDecimal highest = BigDecimal.ZERO;

        for (String line : lines) {

            String lower = line.toLowerCase();

            if (lower.contains("gst") ||
                    lower.contains("tax")) {

                Matcher matcher = numberPattern.matcher(line);

                while (matcher.find()) {

                    try {

                        String value = matcher.group();

                        BigDecimal number =
                                new BigDecimal(value);

                        if (number.compareTo(highest) > 0) {

                            highest = number;

                        }

                    } catch (Exception ignored) {
                    }

                }

            }

        }

        return normalizeAmount(highest);

    }

    private static LocalDate findDate(String text) {

        String[] patterns = {

                "\\d{2}/\\d{2}/\\d{4}",
                "\\d{2}-\\d{2}-\\d{4}",
                "\\d{4}-\\d{2}-\\d{2}"

        };

        for (String regex : patterns) {

            Matcher matcher =
                    Pattern.compile(regex)
                            .matcher(text);

            if (matcher.find()) {

                String value =
                        matcher.group();

                try {

                    if (value.contains("/")) {

                        String[] p =
                                value.split("/");

                        return LocalDate.of(

                                Integer.parseInt(p[2]),

                                Integer.parseInt(p[1]),

                                Integer.parseInt(p[0])

                        );

                    }

                    if (value.matches("\\d{4}-.*")) {

                        return LocalDate.parse(value);

                    }

                    String[] p =
                            value.split("-");

                    return LocalDate.of(

                            Integer.parseInt(p[2]),

                            Integer.parseInt(p[1]),

                            Integer.parseInt(p[0])

                    );

                }

                catch (Exception ignored) {
                }

            }

        }

        return null;

    }

    private static String findPaymentMode(String text) {

        String lower = text.toLowerCase();

        if (lower.contains("upi") ||
                lower.contains("gpay") ||
                lower.contains("google pay") ||
                lower.contains("phonepe") ||
                lower.contains("paytm")) {

            return "UPI";

        }

        if (lower.contains("credit")) {

            return "Credit Card";

        }

        if (lower.contains("debit")) {

            return "Debit Card";

        }

        if (lower.contains("visa") ||
                lower.contains("mastercard") ||
                lower.contains("rupay")) {

            return "Card";

        }

        if (lower.contains("cash") ||
                lower.contains("caso") ||
                lower.contains("ca5h") ||
                lower.contains("cash payment")) {

            return "Cash";

        }

        return "Unknown";

    }

    private static String findCategory(String text) {

        String lower = text.toLowerCase();

        if (lower.contains("restaurant") ||
                lower.contains("food") ||
                lower.contains("pizza") ||
                lower.contains("burger") ||
                lower.contains("cafe") ||
                lower.contains("coffee") ||
                lower.contains("hotel")) {

            return "Food";

        }

        if (lower.contains("mart") ||
                lower.contains("supermarket") ||
                lower.contains("grocery") ||
                lower.contains("shopping") ||
                lower.contains("store")) {

            return "Shopping";

        }

        if (lower.contains("fuel") ||
                lower.contains("petrol") ||
                lower.contains("diesel")) {

            return "Transport";

        }

        if (lower.contains("uber") ||
                lower.contains("ola") ||
                lower.contains("metro")) {

            return "Transport";

        }

        if (lower.contains("medical") ||
                lower.contains("hospital") ||
                lower.contains("pharmacy") ||
                lower.contains("clinic")) {

            return "Healthcare";

        }

        if (lower.contains("electricity") ||
                lower.contains("water") ||
                lower.contains("gas") ||
                lower.contains("internet")) {

            return "Bills";

        }

        if (lower.contains("maintenance") ||
                lower.contains("repair") ||
                lower.contains("service")) {

            return "Services";

        }

        if (lower.contains("movie") ||
                lower.contains("cinema") ||
                lower.contains("netflix") ||
                lower.contains("spotify")) {

            return "Entertainment";

        }

        return "Others";

    }

}