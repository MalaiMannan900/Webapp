package com.webapp.app.userdesignation;

import org.springframework.stereotype.Component;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpStore {

    private final ConcurrentHashMap<String, String> otpMap = new ConcurrentHashMap<>();

    public void saveOtp(String empid, String otp) {
        otpMap.put(empid, otp);
    }

    public String getOtp(String empid) {
        return otpMap.get(empid);
    }

    public void removeOtp(String empid) {
        otpMap.remove(empid);
    }
}