package com.paisatrack.backend.ai.context.model;

public class FinancialHealthContext {

    private Integer score;
    private String status;
    private String summary;

    public FinancialHealthContext() {
    }

    public FinancialHealthContext(Integer score,
                                  String status,
                                  String summary) {
        this.score = score;
        this.status = status;
        this.summary = summary;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}