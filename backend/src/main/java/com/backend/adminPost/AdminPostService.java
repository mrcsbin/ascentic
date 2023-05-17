package com.backend.adminPost;

import java.util.List;

public interface AdminPostService {
    AdminPost createAdminPost(AdminPost adminPost);


    List<AdminPost> getAdminPostsByCategory(String category);

    AdminPost getAdminPost(Long id);
    AdminPost updateAdminPost(Long id, AdminPost adminPost);
    boolean deleteAdminPost(Long id);
}
