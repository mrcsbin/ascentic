package com.backend.adminPost;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AdminPostServiceImpl implements AdminPostService {
    private final AdminPostRepository adminPostRepository;

    @Override
    public AdminPost createAdminPost(AdminPost post) {
        return adminPostRepository.save(post);
    }

    @Override
    public List<AdminPost> getAdminPostsByCategory(String category) {
        if (category.equals("event")) {
            return adminPostRepository.findByPostCategory(category);
        } else if (category.equals("news")) {
            return adminPostRepository.findByPostCategory(category);
        } else {
            return null;
        }
    }

    @Override
    public AdminPost getAdminPost(Long id) {
        return adminPostRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
    }

    @Override
    public AdminPost updateAdminPost(Long id, AdminPost adminPost) {
        AdminPost existingPost = adminPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        existingPost.setPostCategory(adminPost.getPostCategory());
        existingPost.setPostTitle(adminPost.getPostTitle());
        existingPost.setPostContent(adminPost.getPostContent());
        return adminPostRepository.save(existingPost);
    }

    @Override
    public boolean deleteAdminPost(Long id) {
        AdminPost post = adminPostRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        try {
            adminPostRepository.delete(post);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
            super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
        }
    }
}
