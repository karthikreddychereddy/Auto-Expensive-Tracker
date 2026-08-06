package com.paisatrack.backend.repository;

import com.paisatrack.backend.entity.AIConversation;
import com.paisatrack.backend.entity.AIMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AIMessageRepository extends JpaRepository<AIMessage, Long> {

    List<AIMessage> findByConversationOrderByCreatedAtAsc(AIConversation conversation);

}