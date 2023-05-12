package com.backend.adminPost;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AdminPostServiceImpl implements AdminPostService {
    private final AdminPostRepository adminPostRepository;

    @Override
    public AdminPost createAdminPost(AdminPost post) {
        return adminPostRepository.save(post);
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
    public void deleteAdminPost(Long id) {
        AdminPost post = adminPostRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        adminPostRepository.delete(post);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
            super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
        }
    }
}
