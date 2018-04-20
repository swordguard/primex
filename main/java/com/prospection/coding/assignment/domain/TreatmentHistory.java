package com.prospection.coding.assignment.domain;

import java.util.List;

public class TreatmentHistory {
    private int id;
    private List<String> drugs;
    private List<Integer> days;
    private AnalysisResult.PatientType category;

    public TreatmentHistory() {
    }

    public TreatmentHistory(int id, List<String> drugs, List<Integer> days) {
        this.id = id;
        this.drugs = drugs;
        this.days = days;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<String> getDrugs() {
        return drugs;
    }

    public void setDrugs(List<String> drugs) {
        this.drugs = drugs;
    }

    public List<Integer> getDays() {
        return days;
    }

    public void setDays(List<Integer> days) {
        this.days = days;
    }

    public AnalysisResult.PatientType getCategory() {
        return category;
    }

    public void setCategory(AnalysisResult.PatientType category) {
        this.category = category;
    }
}
