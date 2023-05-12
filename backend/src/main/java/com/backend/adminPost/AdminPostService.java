package com.backend.adminPost;

public interface AdminPostService {
    AdminPost createAdminPost(AdminPost adminPost);
    AdminPost getAdminPost(Long id);
    AdminPost updateAdminPost(Long id, AdminPost adminPost);
    void deleteAdminPost(Long id);
}
