package com.paisatrack.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "conversation_id",
            nullable = false
    )
    private AIConversation conversation;

    @Column(nullable = false)
    private String role;

    @Column(
            nullable = false,
            columnDefinition = "LONGTEXT"
    )
    private String content;

    /*
     * ==========================================
     * Attachment metadata
     * ==========================================
     *
     * We are NOT storing the actual attachment
     * inside MySQL.
     *
     * These fields allow the chat history to show
     * which file was attached to a user message.
     */

    @Column(name = "has_attachment")
    @Builder.Default
    private Boolean hasAttachment = false;

    @Column(name = "attachment_name")
    private String attachmentName;

    @Column(name = "attachment_type")
    private String attachmentType;

    @Column(name = "attachment_size")
    private Long attachmentSize;

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {

        if (createdAt == null) {
            createdAt =
                    LocalDateTime.now();
        }

        if (hasAttachment == null) {
            hasAttachment = false;
        }
    }
}