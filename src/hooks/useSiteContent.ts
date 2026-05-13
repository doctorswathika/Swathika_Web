/**
 * Static site content. Previously fetched from a `site_content` Supabase table;
 * inlined here so the site has no DB dependency for copy.
 *
 * Components call `useSiteContent().getText(key, fallback)` and
 * `getAlignClass(key)` exactly as before — only the data source changed.
 */

interface ContentEntry {
  content: string;
  alignment: string;
}

type SiteContentMap = Record<string, ContentEntry>;

const SITE_CONTENT: SiteContentMap = {
  "hero_description": {
    "content": "UK-trained Breast Oncoplastic & Reconstructive Surgeon with 700+ successful surgeries — bringing world-class precision, personalised care, and the confidence you deserve.",
    "alignment": "left"
  },
  "about_greeting": {
    "content": "Hi, I'm",
    "alignment": "left"
  },
  "about_name": {
    "content": "DR. SWATHIKA",
    "alignment": "left"
  },
  "about_tagline": {
    "content": "I'm a UK-trained Breast Oncoplastic & Reconstructive Surgeon and Medical Educator.",
    "alignment": "left"
  },
  "about_paragraph_1": {
    "content": "With over 700 successful procedures and training from both India and the UK, I've seen the fear, frustration, and uncertainty many patients experience while facing breast health concerns.",
    "alignment": "left"
  },
  "about_paragraph_2": {
    "content": "As a breast specialist with global experience, I understand finding the right information, processing a diagnosis, understanding treatment options and getting accurate, practical advice can be really overwhelming.",
    "alignment": "left"
  },
  "about_subheading": {
    "content": "But I'm here to help.",
    "alignment": "left"
  },
  "about_paragraph_3": {
    "content": "Many people think that as a Breast Surgeon, I perform only surgery. But that's far from the truth.",
    "alignment": "left"
  },
  "about_paragraph_4": {
    "content": "My approach combines oncology precision along with aesthetic sensibility — because your confidence matters as much as your health.",
    "alignment": "left"
  },
  "services_subtitle": {
    "content": "Our Services",
    "alignment": "left"
  },
  "services_title": {
    "content": "Signature <span class=\"text-gradient-rose italic\">Treatments</span>",
    "alignment": "left"
  },
  "services_clinical_heading": {
    "content": "Clinical",
    "alignment": "left"
  },
  "services_cosmetic_heading": {
    "content": "Cosmetic",
    "alignment": "left"
  },
  "awareness_subtitle": {
    "content": "Breast Health Awareness",
    "alignment": "left"
  },
  "awareness_title": {
    "content": "What Every Woman <span class=\"text-gradient-rose italic\">Should Know</span>",
    "alignment": "left"
  },
  "awareness_description": {
    "content": "Awareness saves lives. Understanding the signs, knowing what to do, and taking timely action can make all the difference in your breast health journey.",
    "alignment": "left"
  },
  "awareness_symptoms": {
    "content": "A new lump or thickening in the breast or underarm\nSudden change in breast size, shape, or symmetry\nSkin dimpling, puckering, or redness on the breast\nNipple discharge (especially if bloody) and nipple retraction or inversion\nPersistent breast pain not linked to your menstrual cycle\nWarmth or swelling in a specific part of the breast",
    "alignment": "left"
  },
  "awareness_dos": {
    "content": "Perform monthly breast self-examinations after age of 20\nGet annual clinical breast checkups from age 40\nSchedule regular mammograms as recommended by your doctor\nMaintain a healthy weight and stay physically active\nDiscuss your family history with your surgeon",
    "alignment": "left"
  },
  "awareness_donts": {
    "content": "Don’t ignore a lump, especially if painless.\nDon't delay a doctor's visit out of fear\nDon't rely on self-diagnosis from the internet\nDon't assume young women can't get breast cancer\nDon't skip follow-up appointments after treatment\nDon't let stigma prevent you from seeking care",
    "alignment": "left"
  },
  "testimonials_subtitle": {
    "content": "Testimonials",
    "alignment": "left"
  },
  "testimonials_title": {
    "content": "Trust & <span class=\"text-gradient-rose italic\">Transformation</span>",
    "alignment": "left"
  },
  "footer_brand_description": {
    "content": "UK Trained Breast Oncoplastic & Reconstructive Surgeon. Combining global expertise with compassionate, patient-centred care.",
    "alignment": "left"
  },
  "footer_disclaimer": {
    "content": "Medical Disclaimer: This website is for informational purposes only and does not constitute medical advice. Please consult a qualified healthcare professional for diagnosis and treatment.",
    "alignment": "left"
  },
  "footer_address": {
    "content": "Chennai, Tamil Nadu, India",
    "alignment": "left"
  },
  "footer_phone": {
    "content": "+91 98765 43210",
    "alignment": "left"
  },
  "footer_email": {
    "content": "contact@drswathika.com",
    "alignment": "left"
  },
  "footer_whatsapp": {
    "content": "919876543210",
    "alignment": "left"
  },
  "consultation_description": {
    "content": "Take the first step towards expert care.",
    "alignment": "left"
  },
  "svc_mastectomy_subtitle": {
    "content": "A carefully planned surgical procedure to remove all or part of the breast — performed with precision, compassion, and a focus on your recovery and confidence.",
    "alignment": "left"
  },
  "svc_mastectomy_overview_1": {
    "content": "Mastectomy is the surgical removal of the entire breast and is recommended when breast-conserving surgery is not suitable. It may involve removal of one breast (unilateral) or both breasts (bilateral), depending on the clinical and personal circumstances.",
    "alignment": "left"
  },
  "consultation_title": {
    "content": "Your Health Deserves<br/><em class=\"text-gradient-rose\" style=\"font-style:italic\">Expert Hands.</em>",
    "alignment": "left"
  },
  "hero_trust_indicators": {
    "content": "MCh (UK) Trained & certified Professional,700+ Surgeries,Oncology + Aesthetics",
    "alignment": "left"
  },
  "hero_headline": {
    "content": "Your Breast Health<br/><em class=\"text-gradient-rose\" style=\"font-style:italic;display:block;padding-left:1.5em\">in Expert Hands</em>",
    "alignment": "center"
  },
  "svc_mastectomy_overview_2": {
    "content": "Dr. Swathika Rajendran performs mastectomy as part of a comprehensive oncological plan, ensuring clear surgical margins and thorough staging. The procedure is closely coordinated with oncology, radiology, and pathology teams.",
    "alignment": "left"
  },
  "svc_mastectomy_overview_3": {
    "content": "Immediate or delayed breast reconstruction can be planned at the time of mastectomy, allowing patients to make an informed decision that suits their priorities and recovery journey.",
    "alignment": "left"
  },
  "svc_bco_overview_1": {
    "content": "Breast Conserving Surgery (BCS), also known as lumpectomy or wide local excision, involves removing the tumour along with a margin of healthy tissue while preserving the rest of the breast.",
    "alignment": "left"
  },
  "svc_bco_overview_2": {
    "content": "Oncoplastic surgery takes this a step further — combining cancer surgery with plastic surgery principles to actively reshape the breast during the operation, allowing removal of larger tumours while maintaining the breast appearance.",
    "alignment": "left"
  },
  "svc_bco_overview_3": {
    "content": "Dr. Swathika Rajendran holds a specialised MCh in Breast Oncoplastic & Reconstructive Surgery from the UK — one of the few surgeons in India with this level of dedicated training.",
    "alignment": "left"
  },
  "svc_sentinel_subtitle": {
    "content": "A minimally invasive procedure to accurately stage breast cancer by identifying and examining the first lymph nodes in the drainage pathway — guiding the most precise treatment plan.",
    "alignment": "left"
  },
  "svc_sentinel_overview_1": {
    "content": "Sentinel lymph node biopsy (SLNB) is the gold-standard technique to determine whether breast cancer has spread to the lymphatic system. It identifies the sentinel node — the first node to receive drainage from the tumour.",
    "alignment": "left"
  },
  "svc_sentinel_overview_2": {
    "content": "By examining only the sentinel node(s), we can appropriately stage breast cancer with the aim to avoid full axillary lymph node dissection complications associated with, such as lymphoedema.",
    "alignment": "left"
  },
  "svc_sentinel_overview_3": {
    "content": "Dr. Swathika performs this procedure using radio-isotope and/or blue dye mapping techniques, in line with international guidelines.",
    "alignment": "left"
  },
  "svc_axillary_subtitle": {
    "content": "Precise assessment and management of axillary lymph nodes — a critical step in staging and treating breast cancer with expert surgical care.",
    "alignment": "left"
  },
  "svc_axillary_overview_1": {
    "content": "The axillary lymph nodes, located in the armpit, are the primary drainage site for the breast and play a central role in breast cancer staging.",
    "alignment": "left"
  },
  "svc_axillary_overview_2": {
    "content": "Dr. Swathika Rajendran performs axillary node surgery as part of a comprehensive breast cancer treatment plan, including sentinel lymph node biopsy or axillary lymph node dissection when indicated.",
    "alignment": "left"
  },
  "svc_axillary_overview_3": {
    "content": "As a UK-trained oncoplastic surgeon, Dr. Swathika brings an evidence-based, patient-centred approach minimising complications such as lymphoedema while ensuring thorough oncological clearance.",
    "alignment": "left"
  },
  "svc_reduction_subtitle": {
    "content": "Aesthetic enhancement of breast for comfort, symmetry, and confidence — with outcomes that complement your natural form.",
    "alignment": "left"
  },
  "svc_reduction_overview_1": {
    "content": "Breast reduction surgery (reduction mammoplasty) removes excess breast tissue, skin, and fat to achieve a breast size in proportion with your body, relieving physical discomfort and improving posture.",
    "alignment": "left"
  },
  "svc_reduction_overview_2": {
    "content": "Breast augmentation enhances the size and shape of the breast using implants or fat transfer, offering a natural improvement tailored to each patient's anatomy and personal goals.",
    "alignment": "left"
  },
  "svc_reduction_overview_3": {
    "content": "Each treatment plan is tailored to patient needs, focusing on both functional & aesthetical improvement.",
    "alignment": "left"
  },
  "svc_lipo_subtitle": {
    "content": "Natural breast enhancement and reconstruction using your own fat — a versatile, minimally invasive technique with long-lasting results.",
    "alignment": "left"
  },
  "svc_lipo_overview_1": {
    "content": "Lipomodelling (fat grafting) involves harvesting fat from one area of the body and carefully injecting it into the breast to improve shape, volume, or symmetry.",
    "alignment": "left"
  },
  "svc_lipo_overview_2": {
    "content": "The procedure is used both in cosmetic breast surgery and as part of breast reconstruction after cancer treatment, offering a natural alternative to implants with minimal scarring.",
    "alignment": "left"
  },
  "svc_lipo_overview_3": {
    "content": "Dr. Swathika uses lipomodelling as a standalone procedure and in combination with other reconstructive techniques to achieve the best possible aesthetic outcome.",
    "alignment": "left"
  },
  "svc_implant_subtitle": {
    "content": "Restoring the natural breast form after mastectomy using advanced implant-based techniques — precision surgery for a renewed sense of self.",
    "alignment": "left"
  },
  "svc_implant_overview_1": {
    "content": "Implant-based breast reconstruction uses a tissue expander or a definitive implant to restore the breast mound following mastectomy. It can be performed immediately (at the time of mastectomy) or in a delayed setting.",
    "alignment": "left"
  },
  "svc_implant_overview_2": {
    "content": "Modern implant techniques, including the use of acellular dermal matrix (ADM), allow for superior implant coverage and a more natural result with reduced complication rates.",
    "alignment": "left"
  },
  "svc_implant_overview_3": {
    "content": "Dr. Swathika tailors every reconstruction to the patient's body type, treatment plan, and personal preferences, ensuring both oncological safety and aesthetic satisfaction.",
    "alignment": "left"
  },
  "svc_gynae_subtitle": {
    "content": "Effective and precise correction of male breast enlargement — restoring a natural masculine chest contour with minimal downtime.",
    "alignment": "left"
  },
  "svc_gynae_overview_1": {
    "content": "Gynaecomastia is the benign enlargement of male breast tissue, affecting men of all ages. It can cause physical discomfort and significant psychological impact.",
    "alignment": "left"
  },
  "svc_gynae_overview_2": {
    "content": "Surgical correction involves removal of the excess glandular tissue, and sometimes fat and skin, through carefully placed incisions that minimise visible scarring.",
    "alignment": "left"
  },
  "svc_gynae_overview_3": {
    "content": "Dr. Swathika's surgical expertise ensures a natural, flat chest contour with a smooth recovery and minimal risk of recurrence.",
    "alignment": "left"
  },
  "svc_bco_subtitle": {
    "content": "Precise tumour removal with expert breast reshaping — combining oncological safety with cosmetic excellence for the best possible outcome.",
    "alignment": "left"
  },
  "svc_mastectomy_benefits": {
    "content": "[\"Complete removal of cancerous tissue for improved survival\",\"Reduced risk of cancer recurrence\",\"Option for immediate reconstruction in suitable cases\",\"Skin-sparing and nipple-sparing techniques when appropriate\",\"Performed by a UK-trained oncoplastic specialist\",\"Personalised surgical plan for every patient\"]",
    "alignment": "left"
  },
  "svc_mastectomy_process": {
    "content": "[{\"step\":\"Initial Consultation\",\"description\":\"A thorough assessment including clinical examination, review of imaging and biopsy results, and a detailed discussion about surgical options tailored to your specific diagnosis.\"},{\"step\":\"Pre-operative Planning\",\"description\":\"Dr. Swathika works with the multidisciplinary team to finalise the surgical plan, including decisions about the extent of surgery, sentinel node biopsy, and potential immediate reconstruction.\"},{\"step\":\"The Procedure\",\"description\":\"The surgery is performed under general anaesthesia. Depending on the type of mastectomy, the procedure typically takes 1–3 hours. Drains may be placed to prevent fluid collection.\"},{\"step\":\"Recovery & Follow-up\",\"description\":\"Hospital stay is usually 1–3 days. You will receive detailed aftercare instructions, wound care guidance, and scheduled follow-up appointments to monitor healing and discuss further treatment if needed.\"}]",
    "alignment": "left"
  },
  "svc_mastectomy_faqs": {
    "content": "[{\"q\":\"How long does recovery take after a mastectomy?\",\"a\":\"Most patients recover within 4–6 weeks. You can typically return to light activities within 2 weeks, but heavy lifting should be avoided for 6 weeks. Dr. Swathika provides personalised recovery guidance.\"},{\"q\":\"Can I have breast reconstruction at the same time?\",\"a\":\"Yes, immediate reconstruction is often possible and is one of Dr. Swathika's specialities. This is discussed during your initial consultation based on your clinical situation.\"},{\"q\":\"Will I need chemotherapy or radiation after surgery?\",\"a\":\"This depends on the pathology results and is decided by the multidisciplinary team. Dr. Swathika coordinates closely with oncologists to ensure seamless care.\"},{\"q\":\"What type of mastectomy will I need?\",\"a\":\"This is determined by the size, location, and type of cancer, along with your personal preferences. Options include simple mastectomy, skin-sparing, and nipple-sparing mastectomy.\"}]",
    "alignment": "left"
  },
  "svc_bco_benefits": {
    "content": "[\"Aim to Preserve the natural breast with minimal scarring\",\"Equivalent survival outcomes to mastectomy when combined with radiation\",\"Superior cosmetic results compared to standard breast surgery\",\"Allows removal of larger tumours while conserving the breast\",\"Shorter recovery time compared to mastectomy\",\"World-class oncoplastic technique by a UK-trained specialist\"]",
    "alignment": "left"
  },
  "svc_bco_process": {
    "content": "[{\"step\":\"Diagnostic Assessment\",\"description\":\"Comprehensive evaluation of tumour size, location and breast size to determine appropriate breast conserving surgery.\"},{\"step\":\"Technique Selection\",\"description\":\"Dr. Swathika plans the most appropriate oncoplastic approach — ranging from simple tissue rearrangement to complex reshaping.\"},{\"step\":\"The Surgery\",\"description\":\"Performed under general anaesthesia, typically taking 1–3 hours. The tumour is removed with a surrounding margin of healthy tissue, and the breast is actively reshaped.\"},{\"step\":\"Post-operative Care\",\"description\":\"Most patients go home the same day or the next day. Radiation therapy is typically recommended afterwards.\"}]",
    "alignment": "left"
  },
  "svc_bco_faqs": {
    "content": "[{\"q\":\"What is the difference between breast conserving and oncoplastic surgery?\",\"a\":\"Breast conserving surgery removes the tumour while preserving the breast. Oncoplastic surgery adds plastic surgery reshaping techniques on top of this.\"},{\"q\":\"Am I a candidate for this approach?\",\"a\":\"Suitability depends on tumour size relative to breast size, tumour location, and whether clear margins can be achieved.\"},{\"q\":\"Will my breast look different after surgery?\",\"a\":\"With oncoplastic techniques, Dr. Swathika reshapes the remaining tissue to maintain a natural, symmetrical appearance.\"},{\"q\":\"Is radiation therapy always needed after breast conserving surgery?\",\"a\":\"In most cases, yes. Radiation therapy significantly reduces the risk of local recurrence.\"},{\"q\":\"How experienced is Dr. Swathika in oncoplastic surgery?\",\"a\":\"Dr. Swathika holds a dedicated MCh in Breast Oncoplastic Surgery from the UK and has performed over 700 breast procedures.\"}]",
    "alignment": "left"
  },
  "svc_sentinel_benefits": {
    "content": "[\"Accurate cancer staging with minimal invasiveness\",\"Significantly lower risk of lymphoedema compared to full axillary clearance\",\"Faster recovery and less post-operative discomfort\",\"Preserves arm function and mobility\"]",
    "alignment": "left"
  },
  "svc_implant_benefits": {
    "content": "[\"Restores breast shape and body symmetry after mastectomy\",\"Can be performed in a single session.\",\"Wide range of implant options for personalised results\",\"Helps avoid donor-site related complications compared to autologous (flap) reconstruction.\",\"Improved psychological well-being and body confidence\"]",
    "alignment": "left"
  },
  "svc_sentinel_process": {
    "content": "[{\"step\":\"Pre-operative Mapping\",\"description\":\"A small amount of radioactive tracer and/or blue dye is injected near the tumour to identify the sentinel lymph node(s).\"},{\"step\":\"Identification & Removal\",\"description\":\"During surgery, Dr. Swathika uses a specialised technique to locate the sentinel node(s), which are then carefully removed through a small incision.\"},{\"step\":\"Pathological Analysis\",\"description\":\"The removed nodes are sent for detailed pathological examination to check for the presence of cancer cells.\"},{\"step\":\"Follow-up\",\"description\":\"Based on the sentinel node biopsy reports, the required further treatment options are discussed.\"}]",
    "alignment": "left"
  },
  "svc_sentinel_faqs": {
    "content": "[{\"q\":\"Is sentinel node biopsy painful?\",\"a\":\"The procedure is performed under general anaesthesia as part of your breast surgery, so you won't feel any pain during the procedure.\"},{\"q\":\"What is the risk of lymphoedema with SNB?\",\"a\":\"The risk is approximately 5–7%, much lower than the 20–30% risk associated with full axillary clearance.\"},{\"q\":\"What happens if cancer is found in the sentinel node?\",\"a\":\"Further treatment options, which may include additional surgery, radiation, or systemic therapy, are discussed by the multidisciplinary team.\"},{\"q\":\"Will I have a visible scar?\",\"a\":\"The incision is small (2–3cm) and placed in the armpit crease, making it barely visible once healed.\"}]",
    "alignment": "left"
  },
  "svc_axillary_benefits": {
    "content": "[\"Accurate cancer staging to guide the overall treatment plan\",\"Minimally invasive options with sentinel node technique where appropriate\",\"Reduced risk of lymphoedema with careful surgical technique\",\"Combined with breast surgery in a single operation when possible\",\"Evidence-based approach aligned with international guidelines\",\"Expert aftercare and lymphoedema prevention advice\"]",
    "alignment": "left"
  },
  "svc_axillary_process": {
    "content": "[{\"step\":\"Pre-operative Assessment\",\"description\":\"Ultrasound and biopsy of suspicious axillary nodes are performed to evaluate the extent of nodal involvement before surgery.\"},{\"step\":\"Surgical Planning\",\"description\":\"Dr. Swathika determines the optimal axillary surgical approach based on imaging findings, clinical staging, and the planned breast operation.\"},{\"step\":\"The Surgery\",\"description\":\"Axillary node surgery is performed under general anaesthesia, typically alongside the breast procedure.\"},{\"step\":\"Post-operative Care & Monitoring\",\"description\":\"Recovery is closely monitored. Patients receive guidance on arm exercises, lymphoedema prevention, and wound care.\"}]",
    "alignment": "left"
  },
  "svc_axillary_faqs": {
    "content": "[{\"q\":\"What is the difference between sentinel node biopsy and axillary lymph node dissection?\",\"a\":\"Sentinel node biopsy removes only the first one to three lymph nodes — a minimally invasive approach. Axillary dissection removes more nodes and is reserved for confirmed spread.\"},{\"q\":\"Will axillary surgery cause lymphoedema?\",\"a\":\"Lymphoedema is a potential side effect, particularly with more extensive dissection. Dr. Swathika uses careful techniques to minimise this risk.\"},{\"q\":\"Can axillary node surgery be performed at the same time as breast surgery?\",\"a\":\"Yes, in most cases it is performed simultaneously under a single anaesthetic.\"},{\"q\":\"How will I know if my lymph nodes have cancer?\",\"a\":\"Results from sentinel node biopsy are available within days of surgery. Your full pathology report will be discussed at a follow-up appointment.\"}]",
    "alignment": "left"
  },
  "svc_reduction_benefits": {
    "content": "[\"Relief from back, neck, and shoulder pain (reduction)\",\"Improved body proportions and clothing fit\",\"Enhanced confidence and self-image\",\"Natural-looking results with expert technique\",\"Minimise Scars through careful incision placement\",\"Combined oncoplastic expertise for superior outcomes\"]",
    "alignment": "left"
  },
  "svc_reduction_process": {
    "content": "[{\"step\":\"Personal Consultation\",\"description\":\"Dr. Swathika will perform a thorough examination along with a discussion about your goals, concerns, and expectations to recommend suitable options.\"},{\"step\":\"Customised Planning\",\"description\":\"Detailed surgical planning including incision patterns, implant selection (for augmentation) or volume of tissue removal (for reduction).\"},{\"step\":\"The Surgery\",\"description\":\"Performed under general anaesthesia, typically taking 2–3 hours.\"},{\"step\":\"Recovery\",\"description\":\"Initial recovery takes 1–2 weeks. A surgical bra is worn for support. Final results become apparent over 3–6 months.\"}]",
    "alignment": "left"
  },
  "svc_reduction_faqs": {
    "content": "[{\"q\":\"Will I lose nipple sensation after breast reduction?\",\"a\":\"Some temporary changes in sensation are common but usually resolve over weeks to months.\"},{\"q\":\"What implant types are available for augmentation?\",\"a\":\"Both silicone and saline implants are available in various shapes and profiles. Fat transfer augmentation is also an option.\"},{\"q\":\"How long do results last?\",\"a\":\"Reduction results are long-lasting. Augmentation implants typically last 10–15 years before potential replacement.\"},{\"q\":\"Can I breastfeed after breast reduction?\",\"a\":\"Many women can still breastfeed after reduction, though there may be some reduction in milk supply.\"}]",
    "alignment": "left"
  },
  "svc_lipo_benefits": {
    "content": "[\"Completely natural results using your own tissue\",\"No foreign materials required\",\"Ideal for correcting post-surgical contour irregularities\",\"Can be repeated for incremental improvements\"]",
    "alignment": "left"
  },
  "svc_lipo_process": {
    "content": "[{\"step\":\"Assessment & Planning\",\"description\":\"Dr. Swathika evaluates your breast shape, identifies areas needing correction, and selects the most suitable donor site for fat harvesting.\"},{\"step\":\"Fat Harvesting\",\"description\":\"Fat is gently harvested from the chosen donor site using specialised liposuction cannulas, minimising damage to the fat cells.\"},{\"step\":\"Processing & Injection\",\"description\":\"The harvested fat is processed to concentrate viable fat cells, then precisely injected into the breast in small aliquots.\"},{\"step\":\"Recovery & Results\",\"description\":\"Recovery is typically 1–2 weeks. Some swelling and bruising is normal. Approximately 60–80% of transferred fat survives permanently.\"}]",
    "alignment": "left"
  },
  "svc_lipo_faqs": {
    "content": "[{\"q\":\"How much volume can be added with lipomodelling?\",\"a\":\"Typically one cup size per session. Multiple sessions can be performed for greater enhancement.\"},{\"q\":\"Is the fat transfer permanent?\",\"a\":\"Approximately 60–80% of transferred fat integrates permanently. The remaining fat is absorbed in the first few months.\"},{\"q\":\"Does lipomodelling interfere with mammograms?\",\"a\":\"No. Transferred fat does not interfere with breast cancer screening.\"},{\"q\":\"What if I don't have enough fat to transfer?\",\"a\":\"A minimum amount of donor fat is required. Alternative options will be discussed if needed.\"}]",
    "alignment": "left"
  },
  "svc_implant_process": {
    "content": "[{\"step\":\"Reconstruction Planning\",\"description\":\"Detailed discussion about reconstruction options, timing, implant choices, and expected outcomes.\"},{\"step\":\"Tissue Expansion (if needed)\",\"description\":\"In some cases, a tissue expander is placed first to gradually stretch the skin and muscle before the permanent implant.\"},{\"step\":\"Implant Placement\",\"description\":\"The implant is placed in the optimal position — above or below the pectoral muscle — to achieve the most natural shape.\"},{\"step\":\"Refinement & Follow-up\",\"description\":\"Secondary procedures such as nipple reconstruction or fat grafting for contour refinement may be required.\"}]",
    "alignment": "left"
  },
  "svc_implant_faqs": {
    "content": "[{\"q\":\"Should I choose immediate or delayed reconstruction?\",\"a\":\"Immediate reconstruction is preferred when oncologically safe, as it achieves better cosmetic outcomes.\"},{\"q\":\"How long do breast implants last?\",\"a\":\"Modern implants are designed to last 10–15 years or longer. Regular monitoring is recommended.\"},{\"q\":\"Will the reconstructed breast feel natural?\",\"a\":\"While not identical to a natural breast, modern techniques achieve a result that looks natural and feels comfortable.\"},{\"q\":\"What are the risks of implant reconstruction?\",\"a\":\"Risks include infection, capsular contracture, implant malposition, and the need for revision surgery.\"}]",
    "alignment": "left"
  },
  "svc_gynae_benefits": {
    "content": "[\"Flatter, more masculine chest appearance\",\"Relief from physical discomfort and tenderness\",\"Significant boost in self-confidence and body image\",\"Minimally invasive option.\",\"Permanent results when combined with healthy lifestyle\",\"Performed by a specialist breast surgeon for optimal outcomes\"]
    "alignment": "left"
  },
  "svc_gynae_process": {
    "content": "[{\"step\":\"Confidential Consultation\",\"description\":\"Dr. Swathika will have a private and empathetic consultation about your concerns, along with an examination to assess the extent of breast enlargement.\"},{\"step\":\"Treatment Planning\",\"description\":\"Based on the assessment, the most appropriate surgical technique is selected — liposuction, direct excision, or a combination.\"},{\"step\":\"The Procedure\",\"description\":\"Performed under general anaesthesia, typically taking 1–2 hours. Excess tissue is removed through carefully placed incisions.\"},{\"step\":\"Recovery\",\"description\":\"A compression garment is worn for 4–6 weeks. Most patients return to work within 1 week and full activities within 4–6 weeks.\"}]",
    "alignment": "left"
  },
  "svc_gynae_faqs": {
    "content": "[{\"q\":\"What causes gynaecomastia?\",\"a\":\"It can be caused by hormonal imbalances, certain medications, obesity, or may be idiopathic.\"},{\"q\":\"Will the condition come back after surgery?\",\"a\":\"Recurrence is rare when the breast tissue is adequately removed. Maintaining a healthy weight helps ensure lasting results.\"},{\"q\":\"Are there visible scars?\",\"a\":\"Incisions are placed around the edge of the areola or in the armpit crease to minimise visibility.\"},{\"q\":\"Is this covered by insurance?\",\"a\":\"Some insurance providers cover gynaecomastia surgery when it causes documented physical symptoms.\"}]",
    "alignment": "left"
  },
  "faq_items": {
    "content": "[{\"q\":\"What types of breast surgery does Dr. Swathika perform?\",\"a\":\"Dr. Swathika offers a comprehensive range of breast procedures including mastectomy, breast conserving & oncoplastic surgery, sentinel node biopsy, axillary node surgery, breast reduction & augmentation, lipomodelling, implant reconstruction, and gynaecomastia correction.\"},{\"q\":\"Can I have breast reconstruction at the same time as mastectomy?\",\"a\":\"Yes, immediate reconstruction is often possible and is one of Dr. Swathika's specialities. This is discussed during your initial consultation based on your clinical situation and cancer treatment plan.\"},{\"q\":\"How long does recovery take after breast surgery?\",\"a\":\"Recovery varies by procedure. Most patients recover within 4–6 weeks. You can typically return to light activities within 2 weeks, but heavy lifting should be avoided for 6 weeks. Dr. Swathika provides personalised recovery guidance for every patient.\"},{\"q\":\"What is oncoplastic surgery?\",\"a\":\"Oncoplastic surgery combines cancer surgery with plastic surgery techniques. It allows removal of tumours while actively reshaping the breast to achieve a natural, symmetrical appearance — giving the best oncological and cosmetic outcomes together.\"},{\"q\":\"Am I a candidate for breast conserving surgery?\",\"a\":\"This depends on tumour size in relation to breast size, tumour location, and if clear margins can be achieved.\"},{\"q\":\"What is the risk of lymphoedema after sentinel node biopsy?\",\"a\":\"The risk of lymphoedema after sentinel node biopsy is approximately 5–7%, much lower than the 20–30% risk associated with full axillary clearance. This minimally invasive technique preserves arm function while providing relatively accurate cancer staging.\"},{\"q\":\"Is mastectomy best for breast cancer in terms of survival?\",\"a\":\"Studies show that breast conserving surgery combined with radiation provides survival outcomes equivalent to mastectomy for appropriately selected patients.\"}]",
    "alignment": "left"
  }
};

export function useSiteContent() {
  const getText = (key: string, fallback: string = ""): string =>
    SITE_CONTENT[key]?.content || fallback;

  const getAlignClass = (key: string): string => {
    const a = SITE_CONTENT[key]?.alignment ?? "left";
    return a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left";
  };

  return { content: SITE_CONTENT, loading: false, getText, getAlignClass };
}
