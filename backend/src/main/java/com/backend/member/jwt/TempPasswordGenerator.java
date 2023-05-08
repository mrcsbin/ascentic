package com.backend.member.jwt;

import java.security.SecureRandom;
import java.util.Random;

public class TempPasswordGenerator {
    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";

    private static final Random random = new SecureRandom();

    public static String generateRandomPassword(int length) {
        String characters = UPPER + LOWER + DIGITS;
        StringBuilder password = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            password.append(characters.charAt(randomIndex));
        }

        return password.toString();
    }
}
