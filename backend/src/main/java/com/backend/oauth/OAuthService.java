//package com.backend.oauth;
//
//import com.backend.member.Member;
//import com.google.gson.JsonElement;
//import com.google.gson.JsonParser;
//import org.springframework.stereotype.Service;
//
//import java.io.*;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.UUID;
//
//@Service
//public class OAuthService {
//
//    // redirect 된 url 의 code 값을 가지고 token 요청 및 생성
//    public String getKaKaoAccessToken(String code) {
//        String reqURL = "https://kauth.kakao.com/oauth/token";
//        String access_Token = "";
//        String refresh_Token = "";
//
//        try {
//            // url 생성 및 요청 정보 변경
//            URL url = new URL(reqURL);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//            conn.setRequestMethod("POST");
//            conn.setDoOutput(true);
//
//            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
//            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
//            StringBuilder sb = new StringBuilder();
//            sb.append("grant_type=authorization_code");
//            sb.append("&client_id=881ddf35c504cf62f0d76586502b03ca");
//            sb.append("&redirect_uri=http://localhost:3000/login/kakao");
//            sb.append("&code=" + code);
//            bw.write(sb.toString());
//            bw.flush();
//
//            // 전송에 대한 응답으로 받은 스트림을 저장
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            String line = "";
//            String result = "";
//            while ((line = br.readLine()) != null) {
//                result += line;
//            }
//            System.out.println("response body : " + result);
//
//            // 응답 데이터를 파싱, token 값을 저장
//            JsonParser parser = new JsonParser();
//            JsonElement element = parser.parse(result);
//
//            access_Token = element.getAsJsonObject().get("access_token").getAsString();
//
//            br.close();
//            bw.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        return access_Token;
//    }
//
//    // 생성된 access_token 으로 사용자 정보를 요청 및 파싱
//    public Member createKakaoMember(String token) {
//        String reqURL = "https://kapi.kakao.com/v2/user/me";
//
//        try {
//            // 요청 url 생성
//            URL url = new URL(reqURL);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//            conn.setRequestMethod("POST");
//            conn.setDoOutput(true);
//            // 요청 프로퍼티 값으로 "Authorization" 의 값을 "Bearer access_token" 설정
//            conn.setRequestProperty("Authorization", "Bearer " + token);
//
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            String line = "";
//            String result = "";
//
//            while ((line = br.readLine()) != null) {
//                result += line;
//            }
//            System.out.println("response body : " + result);
//
//            JsonParser parser = new JsonParser();
//            JsonElement element = parser.parse(result);
//
//            // 요청에 대한 응답으로 받은 사용자 정보의 필요한 부분을 파싱
//            String id = element.getAsJsonObject().get("id").getAsString();
//            String name = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("profile").getAsJsonObject().get("nickname").getAsString();
//            String profileImage = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("profile").getAsJsonObject().get("profile_image_url").getAsString();
//            String birthday = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("birthday").getAsString();
//            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
//            String email = "";
//            if (hasEmail) {
//                email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
//            }
//
//            br.close();
//
//            // 파싱한 정보를 member 인스턴스에 추가
//            String password = UUID.randomUUID().toString();
//
//            Member member = Member.builder()
//                    .id(id)
//                    .password(password)
//                    .email(email)
//                    .name(name)
//                    .profileImage(profileImage)
//                    .birthday(birthday)
//                    .build();
//
////            member.setId(id);
////            member.setPassword(password);
////            member.setEmail(email);
////            member.setName(name);
////            member.setProfileImage(profileImage);
////            member.setBirthday(birthday);
//            return member;
//        } catch (IOException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//}
