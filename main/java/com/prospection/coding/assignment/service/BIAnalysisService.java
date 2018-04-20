package com.prospection.coding.assignment.service;

import com.prospection.coding.assignment.data.PurchaseRecordDAO;
import com.prospection.coding.assignment.domain.AnalysisResult;
import com.prospection.coding.assignment.domain.PurchaseRecord;
import com.prospection.coding.assignment.domain.TreatmentHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

import static com.prospection.coding.assignment.domain.AnalysisResult.PatientType.*;

@Component
public class BIAnalysisService {

    private final PurchaseRecordDAO purchaseRecordDAO;
    private Map<Integer, TreatmentHistory> patientInfo;

    @Autowired
    public BIAnalysisService(PurchaseRecordDAO purchaseRecordDAO) {
        this.purchaseRecordDAO = purchaseRecordDAO;
    }

    public AnalysisResult performBIAnalysis() throws Exception {
        List<PurchaseRecord> purchaseRecords = purchaseRecordDAO.allPurchaseRecords();
        // do some processing here

        int violated = 0;
        int valid_no_comed = 0;
        int valid_bi_switch = 0;
        int valid_ib_switch = 0;
        int valid_i_trial = 0;
        int valid_b_trial = 0;
        patientInfo = new HashMap<>();
        TreatmentHistory treatmentHistory;

        purchaseRecords.sort((p1, p2) -> {
            if (p1.getDay() == p2.getDay()) {
                return 0;
            }
            return p1.getDay() - p2.getDay() > 0 ? 1 : -1;
        });

        // 1. prepare organized data
        for (PurchaseRecord purchaseRecord : purchaseRecords) {

            if (!patientInfo.containsKey(purchaseRecord.getPatientId())) {
                treatmentHistory = new TreatmentHistory();
                List<String> drugs = new ArrayList<>();
                List<Integer> days = new ArrayList<>();
                drugs.add(purchaseRecord.getMedication());
                days.add(purchaseRecord.getDay());
                treatmentHistory.setId(purchaseRecord.getPatientId());
                treatmentHistory.setDays(days);
                treatmentHistory.setDrugs(drugs);
                patientInfo.put(purchaseRecord.getPatientId(), treatmentHistory);
            } else {
                treatmentHistory = patientInfo.get(purchaseRecord.getPatientId());
                treatmentHistory.getDrugs().add(purchaseRecord.getMedication());
                treatmentHistory.getDays().add(purchaseRecord.getDay());
                patientInfo.put(purchaseRecord.getPatientId(), treatmentHistory);
            }
        }

        // 2. begin processing
        for (Map.Entry<Integer, TreatmentHistory> entries: patientInfo.entrySet()) {
            int pid = entries.getKey();
            TreatmentHistory history = entries.getValue();
            AnalysisResult.PatientType type = this.checkCategory(pid, history);
            switch (type) {
                case VALID_BI_SWITCH:
                    valid_bi_switch++;
                    history.setCategory(VALID_BI_SWITCH);
                    break;
                case VALID_IB_SWITCH:
                    valid_ib_switch++;
                    history.setCategory(VALID_IB_SWITCH);
                    break;
                case VALID_B_TRIAL:
                    valid_b_trial++;
                    history.setCategory(VALID_B_TRIAL);
                    break;
                case VALID_I_TRIAL:
                    valid_i_trial++;
                    history.setCategory(VALID_I_TRIAL);
                    break;
                case VALID_NO_COMED:
                    valid_no_comed++;
                    history.setCategory(VALID_NO_COMED);
                    break;
                case VIOLATED:
                    violated++;
                    history.setCategory(VIOLATED);
                    default:
            }
        }
        // then put real results in here
        AnalysisResult result = new AnalysisResult();
        result.putTotal(VIOLATED, violated);
        result.putTotal(VALID_NO_COMED, valid_no_comed);
        result.putTotal(VALID_BI_SWITCH, valid_bi_switch);
        result.putTotal(VALID_IB_SWITCH, valid_ib_switch);
        result.putTotal(VALID_I_TRIAL, valid_i_trial);
        result.putTotal(VALID_B_TRIAL, valid_b_trial);
        return result;
    }


    private AnalysisResult.PatientType checkCategory(int pid, TreatmentHistory treatmentHistory) {
        List<String> drugs = treatmentHistory.getDrugs();
        List<Integer> days = treatmentHistory.getDays();
        List<String> switchArray = new ArrayList<>();

        if (drugs.indexOf("B") == -1 || drugs.indexOf("I") == -1) {
            return VALID_NO_COMED;
        }

        if (drugs.indexOf("B") == drugs.lastIndexOf("B") && drugs.indexOf("B") != 0) {
            return VALID_B_TRIAL;
        }

        if (drugs.indexOf("I") == drugs.lastIndexOf("I") && drugs.indexOf("I") != 0) {
            return VALID_I_TRIAL;
        }
        // B for 30, I for 90
        for (int i = 0; i < drugs.size() - 1; i++) {
            if (!drugs.get(i).equals(drugs.get(i + 1))) {
                // from I to B
                if (drugs.get(i + 1).equals("B")) {
                    if (days.get(i + 1) - days.get(i) <= 90) {
                        return VIOLATED;
                    } else {
                        switchArray.add("IB");
                    }
                }
                // from B to I
                else {
                    if (days.get(i + 1) - days.get(i) <= 30) {
                        return VIOLATED;
                    } else {
                        switchArray.add("BI");
                    }
                }
            }
        }

        if (switchArray.get(0).equals("BI")) {
            return VALID_BI_SWITCH;
        }
        if (switchArray.get(0).equals("IB")) {
            return VALID_IB_SWITCH;
        }

        return VALID_NO_COMED;
    }

    public Map<Integer, TreatmentHistory> getPatientInfo() {
        return this.patientInfo;
    }

}
