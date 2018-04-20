package com.prospection.coding.assignment.web;

import com.prospection.coding.assignment.domain.AnalysisResult;
import com.prospection.coding.assignment.domain.TreatmentHistory;
import com.prospection.coding.assignment.service.BIAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("bi")
public class BIAnalysisController {

    private final BIAnalysisService biAnalysisService;

    @Autowired
    public BIAnalysisController(BIAnalysisService biAnalysisService) {
        this.biAnalysisService = biAnalysisService;
    }

    @RequestMapping("/analysis")
    @ResponseBody
    public AnalysisResult analysis() throws Exception {
        return biAnalysisService.performBIAnalysis();
    }

    @RequestMapping(value = "/category", method = RequestMethod.GET)
    @ResponseBody
    public List<TreatmentHistory> getCategoryByLabel(@RequestParam("category") String category) throws Exception {
        Map<Integer, TreatmentHistory> patientInfo = biAnalysisService.getPatientInfo();
        List<TreatmentHistory> list = new ArrayList<>();

        for (Map.Entry<Integer, TreatmentHistory> entry : patientInfo.entrySet()) {
            TreatmentHistory treatmentHistory = entry.getValue();
            if (treatmentHistory.getCategory().getName().equals(category)) {
                list.add(treatmentHistory);
            }
        }

        return list;
    }
}
