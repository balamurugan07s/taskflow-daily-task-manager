// report_data.js - Comprehensive Academic Data for Task-1 Literature Survey Report

module.exports = {
  metadata: {
    course: "Machine Learning",
    taskNumber: "Task-1",
    taskTitle: "Background Study (Literature Survey Report)",
    documentTitle: "Literature Survey on Diabetic Retinopathy Detection Using Deep Learning",
    studentName: "[Student Name]",
    registerNumber: "[Register Number]",
    department: "Department of Computer Science and Engineering",
    institution: "[Institution / University Name]",
    submissionDate: "September 30, 2026",
    academicYear: "2026–2027"
  },

  introduction: {
    heading: "1. Introduction",
    paragraphs: [
      "Diabetic Retinopathy (DR) is a severe ocular complication resulting from persistent diabetes mellitus, characterized by systemic microvascular damage to the retina. Chronic hyperglycemia induces endothelial cell damage, capillary basement membrane thickening, pericyte apoptosis, and microvascular occlusion. These pathological changes impair retinal perfusion, triggering localized tissue ischemia and secondary hypoxia. Consequently, retinal tissue undergoes structural damage manifesting as hallmark microvascular lesions: microaneurysms (dilations of retinal capillaries), intraretinal dot-and-blot hemorrhages, hard exudates (extravasated lipoprotein and lipid complexes), cotton-wool spots (localized nerve fiber layer infarcts), venous beading, intraretinal microvascular abnormalities (IRMA), and pathological neovascularization. In advanced stages, neovascular proliferation penetrates the internal limiting membrane, leading to pre-retinal and vitreous hemorrhage, tractional retinal detachment, neovascular glaucoma, and irreversible visual impairment.",
      "According to the International Clinical Diabetic Retinopathy (ICDR) disease severity scale, diabetic retinopathy progresses through five distinct clinical stages: (0) No Apparent Retinopathy, where no vascular abnormalities are observable; (1) Mild Non-Proliferative Diabetic Retinopathy (NPDR), identified exclusively by the presence of microaneurysms; (2) Moderate NPDR, characterized by more extensive microaneurysms, intraretinal hemorrhages, and hard exudates, but less severe than the defining criteria for severe NPDR; (3) Severe NPDR, defined by the clinical '4-2-1 rule' (extensive intraretinal hemorrhages in all four quadrants, venous beading in at least two quadrants, or prominent IRMA in at least one quadrant); and (4) Proliferative Diabetic Retinopathy (PDR), defined by active neovascularization at the optic disc or elsewhere in the retina, often accompanied by vitreous or preretinal hemorrhages. In parallel, Diabetic Macular Edema (DME)—characterized by vascular leakage and retinal thickening at the macula—can manifest at any NPDR or PDR stage and represents the primary cause of moderate central vision loss in diabetic patients.",
      "From an epidemiological perspective, diabetic retinopathy is recognized by the World Health Organization (WHO) and the International Diabetes Federation (IDF) as the predominant cause of preventable blindness and moderate-to-severe visual impairment among working-age adults worldwide. Approximately 537 million adults globally live with diabetes, a figure projected to rise to 783 million by 2045. Clinical longitudinal studies indicate that approximately one in three individuals diagnosed with diabetes develops some stage of DR, and one in ten develops vision-threatening diabetic retinopathy (VTDR). However, the progression toward severe blindness can be prevented in over 90% of cases if the pathology is identified and treated at an early, asymptomatic stage through systematic screening, tight glycemic management, retinal laser photocoagulation, anti-VEGF (Vascular Endothelial Growth Factor) intravitreal injections, or vitrectomy.",
      "Despite the proven clinical efficacy of timely interventions, conventional screening programs face critical bottlenecks globally. Traditional diagnostic protocols require dilated eye examinations performed by certified ophthalmologists or trained vitreoretinal specialists using slit-lamp biomicroscopy, direct/indirect ophthalmoscopy, or color fundus photography. These clinical procedures are labor-intensive, costly, subject to substantial inter-observer and intra-observer variability, and reliant on heavily concentrated medical infrastructure. In low-to-middle-income countries and rural healthcare settings, the acute shortage of trained ophthalmologists creates massive screening backlogs, causing millions of diabetic patients to remain undiagnosed until irreversible visual impairment occurs.",
      "To address this critical global healthcare disparity, automated Computer-Aided Diagnosis (CAD) powered by Machine Learning and Deep Learning (DL) has emerged as a transformative solution. Deep Convolutional Neural Networks (CNNs), attention mechanisms, and Vision Transformers (ViTs) can process high-resolution digital retinal fundus photographs autonomously, extracting complex hierarchical morphological features directly from raw pixel data without requiring laborious manual feature engineering. These algorithms offer the potential for high-throughput, low-cost, point-of-care triaging and screening, enabling timely referral of patients with referable DR (moderate NPDR or worse, and/or DME) to tertiary clinical centers.",
      "The primary objective of this literature survey report is to conduct a systematic, critical, and comprehensive investigation into state-of-the-art deep learning methodologies for automated diabetic retinopathy detection, severity grading, and lesion segmentation published over the past five years (2020–2024). Specifically, this study reviews twelve high-impact peer-reviewed empirical papers from prominent academic repositories (IEEE Xplore, Elsevier/ScienceDirect, Springer, MDPI); assesses the evolution of deep learning architectures from classical transfer-learning CNNs to hybrid attention networks and modern hierarchical Vision Transformers; evaluates performance benchmarks across standardized clinical datasets (e.g., Kaggle EyePACS, Messidor-1/2, APTOS 2019, IDRiD, DDR); synthesizes findings into a rigorous comparative matrix; delineates critical persisting research gaps; and outlines a concrete, clinically grounded proposed methodological framework for future research."
    ]
  },

  papers: [
    {
      id: 1,
      year: 2020,
      subheading: "2.1 Literature Review 1 (2020): Blended Multi-Modal Deep ConvNet Features for DR Severity Prediction",
      authors: "J. D. Bodapati, V. Dondeti, S. N. Shareef, and V. Naralasetti",
      title: "Blended Multi-Modal Deep ConvNet Features for Diabetic Retinopathy Severity Prediction",
      venue: "Electronics (MDPI), vol. 9, no. 6, p. 914, 2020. DOI: 10.3390/electronics9060914",
      objective: "To investigate whether blending high-level feature representations extracted from multiple diverse pre-trained Convolutional Neural Networks (ConvNets) can capture complementary pathological representations of retinal lesions and improve multi-class DR grading over individual single-backbone architectures.",
      methodology: "The authors designed a multi-model deep feature fusion pipeline. Three distinct pre-trained ConvNet architectures (VGG-16, ResNet-50, and Inception-V3) were employed as parallel feature extractors. Retinal fundus images underwent circular cropping, resizing to 224x224 and 299x299 pixels, and standard contrast normalization. Bottleneck activation vectors from the terminal pooling layers of each backbone were extracted, normalized via L2-norm, and concatenated into a unified composite representation. A multi-layer perceptron (MLP) classification head equipped with dropout (rate 0.5) and softmax activation was trained using categorical cross-entropy loss to predict the five ICDR severity grades.",
      dataset: "Evaluated on two benchmark repositories: the Kaggle EyePACS dataset (comprising 35,126 retinal fundus images exhibiting significant variations in illumination and angle) and the Messidor-1 dataset (1,200 curated macula-centered images). A standard 80:20 train-test partition was applied.",
      results: "The composite blended feature representation achieved an overall classification accuracy of 84.3% across the 5-class DR severity classification on EyePACS, and 89.6% on Messidor-1. For the clinically critical binary screening task (normal vs. referable DR, defined as Grade >= 2), the model demonstrated an Area Under the ROC Curve (AUC) of 0.941, sensitivity of 88.7%, and specificity of 92.4%, clearly outperforming individual stand-alone VGG-16 (accuracy 79.1%) and ResNet-50 (accuracy 81.6%) models.",
      limitations: "The concatenated feature representation generated a high-dimensional feature vector, resulting in substantial computational redundancy and memory consumption during inference. The model evaluated whole-image representations without explicit spatial localization or attention mechanisms to highlight localized microvascular lesions, functioning essentially as a black-box classifier.",
      futureScope: "Integration of adaptive feature dimensionality reduction (such as Principal Component Analysis or autoencoders) and spatial attention mechanisms to weight lesion-bearing regions dynamically while filtering out background retinal noise."
    },
    {
      id: 2,
      year: 2020,
      subheading: "2.2 Literature Review 2 (2020): Hyperparameter Tuning Deep Learning for DR Fundus Image Classification",
      authors: "K. Shankar, E. Perumal, M. Elhoseny, and P. T. Nguyen",
      title: "Hyperparameter Tuning Deep Learning for Diabetic Retinopathy Fundus Image Classification",
      venue: "IEEE Access, vol. 8, pp. 118166–118174, 2020. DOI: 10.1109/ACCESS.2020.3005152",
      objective: "To eliminate empirical manual trial-and-error hyperparameter tuning in deep convolutional neural networks by introducing an automated bio-inspired meta-heuristic optimization algorithm, thereby optimizing DR classification performance.",
      methodology: "The proposed framework combined an advanced image preprocessing pipeline with an automated hyperparameter-optimized CNN. Fundus photographs underwent green-channel extraction (maximizing vessel contrast), followed by Contrast-Limited Adaptive Histogram Equalization (CLAHE) to amplify subtle microaneurysm boundaries. The deep CNN architecture was trained where critical hyperparameters—including learning rate, batch size, convolutional filter kernel sizes, and dropout probabilities—were systematically optimized using an Invasive Weed Optimization (IWO) and modified Grey Wolf Optimizer (GWO) meta-heuristic search algorithm, converging toward optimal global weights.",
      dataset: "Tested on two public ophthalmic benchmark datasets: the Messidor-1 database (1,200 images, 4 DR grades) and the DIARETDB0 standard database (130 images containing 110 fundus images with explicit DR lesions). 10-fold cross-validation was employed.",
      results: "The hyperparameter-tuned deep network achieved an outstanding classification accuracy of 97.4% on binary normal-versus-abnormal detection, and 92.1% on multi-class disease grading on the Messidor dataset, alongside a sensitivity of 96.2% and specificity of 98.1%. The automated optimization converged to higher-performing weight configurations significantly faster than standard grid search or random search baselines.",
      limitations: "The meta-heuristic optimization phase required substantial initial computational runtime across iterative population generations. Furthermore, the framework was validated exclusively on relatively small, well-curated datasets without evaluating generalization robustness on heavily degraded, low-quality clinical fundus images.",
      futureScope: "Accelerating meta-heuristic convergence through surrogate fitness evaluation models and validating the optimized architecture across large-scale multi-ethnic clinical datasets."
    },
    {
      id: 3,
      year: 2020,
      subheading: "2.3 Literature Review 3 (2020): DR Classification Using a Modified Xception Architecture",
      authors: "S. H. Kassani, P. H. Kassani, R. Khazaeinezhad, M. J. Wesolowski, K. A. Schneider, and R. Deters",
      title: "Diabetic Retinopathy Classification Using a Modified Xception Architecture",
      venue: "IEEE 19th International Symposium on Signal Processing and Information Technology (ISSPIT), pp. 1–6, 2020. DOI: 10.1109/ISSPIT51521.2020.9408891",
      objective: "To evaluate depthwise separable convolutions for capturing multi-scale spatial correlations in retinal fundus images and overcome performance degradation caused by vanishing gradients in very deep architectures.",
      methodology: "The authors designed a modified Xception architecture incorporating Deep Layer Aggregation (DLA) principles. Traditional full convolutions were replaced with depthwise separable convolutions, separating spatial filtering from cross-channel correlation. Feature representations from intermediate hierarchical blocks were aggregated and merged across multiple scales, preserving fine-grained micro-lesion details alongside global retinal context. Image preprocessing included circular masking, illumination correction, and extensive affine data augmentations. The final aggregated representations were classified via dense fully connected layers with L2 regularization.",
      dataset: "Evaluated on the Kaggle EyePACS dataset (35,126 fundus images) and benchmarked against Messidor-2 (1,748 images). Training was performed using 5-fold cross-validation.",
      results: "The modified Xception network achieved a top-1 classification accuracy of 83.2% for 5-class DR grading and an AUC of 0.924 for referable DR detection. The depthwise separable design reduced total model parameters by approximately 40% compared to standard ResNet-152 and VGG-19, enabling faster gradient propagation and lower inference latency per image.",
      limitations: "The model exhibited notable sensitivity degradation on Grade 1 (Mild NPDR), recording a class-specific recall of only 68.4%. Subtle microaneurysms (<10 pixels in diameter) were frequently smoothed out during aggressive spatial striding in early convolutional stages.",
      futureScope: "Introducing high-resolution residual feature preservation branches and multi-scale attention mechanisms to safeguard microscopic vascular lesion cues during downsampling."
    },
    {
      id: 4,
      year: 2021,
      subheading: "2.4 Literature Review 4 (2021): Multi-Class Multi-Label Ophthalmological Disease Detection Using Transfer Learning",
      authors: "N. Gour and P. Khanna",
      title: "Multi-Class Multi-Label Ophthalmological Disease Detection Using Transfer Learning Based Convolutional Neural Network",
      venue: "Biomedical Signal Processing and Control (Elsevier), vol. 66, p. 102329, 2021. DOI: 10.1016/j.bspc.2021.102329",
      objective: "To develop an automated deep transfer-learning model capable of simultaneously detecting diabetic retinopathy alongside co-existing ocular pathologies (such as glaucoma, age-related macular degeneration, and cataract) in a realistic multi-disease clinical setting.",
      methodology: "A two-phase transfer learning framework was constructed using deep CNN backbones (VGG-19 and ResNet-50). In the first phase, feature extraction weights pre-trained on ImageNet were fine-tuned on general ocular images. In the second phase, disease-specific classification branches were trained using a binary cross-entropy multi-label loss function to handle co-morbid ophthalmic conditions. Color fundus images were preprocessed through Ben Graham's method (local average color subtraction) and normalized to highlight vascular anomalies and exudative lesions.",
      dataset: "ODIR-5K (Ophthalmic Disease Intelligent Recognition) dataset, consisting of 5,000 real-world patients (10,000 fundus images) across eight categories: Normal, Diabetes, Glaucoma, Cataract, AMD, Hypertension, Myopia, and Other abnormalities.",
      results: "The framework achieved an overall F1-score of 89.2% for diabetic retinopathy classification and a mean AUC of 0.941 across all co-existing ophthalmic categories. The model effectively discriminated isolated DR lesions from hypertensive retinopathy and exudative AMD.",
      limitations: "Classification performance degraded noticeably when fundus images presented severe optical media opacities (e.g., advanced cataracts or corneal haze), which obscured retinal vascular landmarks and caused false-negative DR predictions.",
      futureScope: "Incorporating an automated image-quality assessment and restoration sub-network to filter or enhance degraded fundus images prior to multi-disease diagnostic evaluation."
    },
    {
      id: 5,
      year: 2021,
      subheading: "2.5 Literature Review 5 (2021): DR Fundus Image Classification and Lesions Localization System Using Deep Learning",
      authors: "W. L. Alyoubi, W. M. Shalash, and M. F. Abulkhair",
      title: "Diabetic Retinopathy Fundus Image Classification and Lesions Localization System Using Deep Learning",
      venue: "Sensors (MDPI), vol. 21, no. 11, p. 3704, 2021. DOI: 10.3390/s21113704",
      objective: "To build a dual-functional computer-aided diagnostic framework that provides both global DR severity classification and localized spatial bounding-box detection of individual clinical lesions (microaneurysms, hemorrhages, hard exudates, and soft exudates).",
      methodology: "The authors implemented a cascaded two-stage deep learning pipeline. The first stage utilized the YOLOv3 (You Only Look Once) one-stage object detection model to detect and localize specific pathological lesions with bounding boxes. The second stage deployed a deep ResNet-50 classification network to predict the global 5-grade ICDR severity level. Fundus photographs were preprocessed using CLAHE and color-space transformations to accentuate contrast between exudates and the retinal pigment epithelium.",
      dataset: "Trained and benchmarked on the IDRiD (Indian Diabetic Retinopathy Image Dataset) containing 516 fundus images with comprehensive pixel-level and bounding-box lesion annotations, alongside testing on the Kaggle EyePACS dataset.",
      results: "The lesion detection module achieved a Mean Average Precision (mAP) of 84.6% for hard exudates and 81.2% for hemorrhages. The overall DR severity grading network attained an accuracy of 89.4%, sensitivity of 91.2%, and specificity of 93.5% for referable DR detection, providing clinicians with visual evidence supporting each automated grade.",
      limitations: "Bounding-box localization lacked pixel-level boundary precision, particularly for microaneurysms that span only a few pixels. Furthermore, training the object detection stage required exhaustive manual bounding-box annotations, which are scarce and expensive to generate clinically.",
      futureScope: "Transitioning toward weakly supervised lesion localization using class activation mapping (CAM) or attention maps to eliminate the dependency on costly manual bounding-box annotations."
    },
    {
      id: 6,
      year: 2021,
      subheading: "2.6 Literature Review 6 (2021): DR Detection and Classification Using Mixed Models for a Disease Grading Database",
      authors: "A. Bilal, L. Sun, and S. Mazhar",
      title: "Diabetic Retinopathy Detection and Classification Using Mixed Models for a Disease Grading Database",
      venue: "IEEE Access, vol. 9, pp. 23544–23553, 2021. DOI: 10.1109/ACCESS.2021.3056187",
      objective: "To mitigate class imbalance and improve fine-grained severity grading accuracy across skewed DR distributions using heterogeneous deep ensemble learning combined with targeted optical preprocessing.",
      methodology: "The proposed methodology introduced an ensemble architecture combining DenseNet-121, ResNet-101, and Inception-V3 with a weighted soft-voting decision aggregation head. Preprocessing involved green-channel extraction, contrast-limited equalization, and circular boundary masking. Data augmentation included rotation, shearing, zoom, and horizontal flipping to artificially balance minority classes (specifically Grade 1 Mild NPDR and Grade 3 Severe NPDR). The ensemble model was trained using Adam optimizer with cosine annealing learning rate schedules.",
      dataset: "Evaluated on the APTOS 2019 Blindness Detection dataset (3,662 high-resolution retinal images) and cross-validated on the Messidor-1 benchmark dataset.",
      results: "The heterogeneous ensemble model achieved 96.7% accuracy for binary DR detection, 88.5% accuracy for 5-class severity classification, and a Quadratic Weighted Kappa (QWK) score of 0.912 on the APTOS 2019 test split, substantially surpassing individual base classifiers.",
      limitations: "Significant misclassification occurred between adjacent clinical stages, particularly between Class 1 (Mild) and Class 2 (Moderate), due to standard categorical cross-entropy loss treating all inter-class prediction errors equally rather than penalizing distant ordinal errors more severely.",
      futureScope: "Incorporating ordinal regression loss functions that explicitly account for the natural disease progression hierarchy in diabetic retinopathy."
    },
    {
      id: 7,
      year: 2021,
      subheading: "2.7 Literature Review 7 (2021): Composite DNN with Gated-Attention Mechanism for DR Severity Classification",
      authors: "J. D. Bodapati, S. N. Shareef, V. Naralasetti, and N. B. Hakak",
      title: "Composite Deep Neural Network with Gated-Attention Mechanism for Diabetic Retinopathy Severity Classification",
      venue: "Journal of Ambient Intelligence and Humanized Computing (Springer), vol. 12, pp. 9825–9839, 2021. DOI: 10.1007/s12652-020-02728-6",
      objective: "To direct deep convolutional feature learning toward clinically meaningful retinal lesion regions while suppressing irrelevant background physiological artifacts through an internal gated-attention mechanism.",
      methodology: "The authors formulated a composite deep network integrating Xception and DenseNet-169 architectures augmented with a custom Gated-Attention Unit (GAU). The GAU learns spatial and channel-wise gating masks that assign higher weights to spatial feature regions exhibiting abnormal textures (hemorrhages, exudates) while suppressing healthy retinal background. Preprocessed fundus images (299x299 pixels) were passed through parallel convolutional backbones, and their gated-attention feature maps were merged via element-wise addition and classified with a softmax layer.",
      dataset: "Trained and evaluated on the Kaggle EyePACS (35,126 images) and Messidor-2 (1,748 images) benchmark datasets.",
      results: "The gated-attention composite model achieved 87.1% accuracy on 5-class DR grading, an AUC of 0.958, sensitivity of 93.6%, and specificity of 95.2% on referable DR detection. Saliency maps generated by the attention gates demonstrated strong visual correspondence with pathological lesion clusters.",
      limitations: "The attention mechanism occasionally focused incorrectly on physiological bright structures, specifically the optic disc margin and prominent choroidal vessels, misinterpreting normal anatomical boundaries as hard exudates or vascular proliferation.",
      futureScope: "Incorporating explicit anatomical landmark segmentation (optic disc and fovea masking) to prevent false-positive attention activation on normal structures."
    },
    {
      id: 8,
      year: 2022,
      subheading: "2.8 Literature Review 8 (2022): Deep Learning Techniques for DR Classification: A Survey and Comparative Benchmark",
      authors: "M. Z. Atwany, A. H. Sahyoun, and M. Yaqub",
      title: "Deep Learning Techniques for Diabetic Retinopathy Classification: A Survey and Comparative Benchmark",
      venue: "IEEE Access, vol. 10, pp. 28642–28655, 2022. DOI: 10.1109/ACCESS.2022.3157632",
      objective: "To conduct a standardized empirical benchmark comparing modern supervised deep learning architectures, self-supervised pre-training paradigms, and data augmentation strategies under identical experimental protocols for DR grading.",
      methodology: "The authors benchmarked leading CNN architectures—including ResNet-50, EfficientNet (B0 through B5), and RegNet—alongside self-supervised learning (SimCLR and MoCo-v2) for retinal fundus representation learning. All models were trained using standardized 5-fold cross-validation, Ben Graham's illumination preprocessing, and test-time augmentation (TTA). Quadratic Weighted Kappa (QWK), Area Under Curve (AUC), and balanced accuracy were measured across all experiments.",
      dataset: "Conducted across multiple public benchmark datasets: APTOS 2019 (3,662 images), Kaggle EyePACS (35,126 images), Messidor-2 (1,748 images), and DDR (13,673 images).",
      results: "EfficientNet-B4 emerged as the highest-performing supervised architecture, achieving 84.9% accuracy, 0.924 QWK, and 0.963 AUC on the APTOS dataset with only 19M parameters. Self-supervised pre-training on unlabeled retinal images improved zero-shot out-of-distribution transferability by 4.8% compared to standard ImageNet pre-training.",
      limitations: "The benchmark revealed a severe domain shift phenomenon: models trained on APTOS experienced an average 14.2% drop in accuracy when evaluated directly on Messidor-2 without domain adaptation, driven by differences in camera hardware, pupil dilation protocols, and demographic pigmentation.",
      futureScope: "Developing domain-invariant feature representations, unsupervised domain adaptation (UDA), and federated learning frameworks to ensure multi-center clinical robustness."
    },
    {
      id: 9,
      year: 2022,
      subheading: "2.9 Literature Review 9 (2022): AI-Based Automatic Detection and Classification of DR Using U-Net and Deep Learning",
      authors: "A. Bilal, G. Sun, Y. Li, S. Mazhar, and A. Q. Khan",
      title: "AI-Based Automatic Detection and Classification of Diabetic Retinopathy Using U-Net and Deep Learning",
      venue: "Symmetry (MDPI), vol. 14, no. 7, p. 1427, 2022. DOI: 10.3390/sym14071427",
      objective: "To develop an integrated segmentation-and-classification framework that leverages retinal vascular tree morphology and lesion masks extracted by an enhanced U-Net to guide downstream disease grading.",
      methodology: "A two-stage sequential deep learning architecture was implemented. In Stage 1, an enhanced U-Net model featuring symmetric encoder-decoder pathways and residual skip connections was trained to perform semantic segmentation of retinal blood vessels and microvascular abnormalities. In Stage 2, segmented binary vessel masks and preprocessed RGB fundus images were fed into a customized CNN classifier with spatial pyramid pooling to assign the final DR severity grade.",
      dataset: "Evaluated on DRIVE (40 images) and STARE (20 images) for retinal vessel segmentation, and the APTOS 2019 Blindness Detection dataset (3,662 images) for disease classification.",
      results: "The U-Net model attained a vessel segmentation accuracy of 96.8% and an AUC of 0.981. The downstream classification network achieved 91.3% accuracy for binary detection and 86.4% accuracy for 5-class DR severity classification, with a sensitivity of 92.1% and specificity of 94.7% for referable DR.",
      limitations: "The cascaded two-stage pipeline suffered from error propagation: imperfect vessel or lesion segmentation in Stage 1 directly compromised classification accuracy in Stage 2. Moreover, processing high-resolution images through two separate deep networks imposed substantial latency (~1.8 seconds per image).",
      futureScope: "Constructing unified, end-to-end multi-task learning frameworks where segmentation and classification branches share early feature representations and optimize a joint loss function."
    },
    {
      id: 10,
      year: 2023,
      subheading: "2.10 Literature Review 10 (2023): Simultaneous Multiclass Retinal Lesion Segmentation Using Fully Automated RILBP-YNet",
      authors: "P. G. Pavani, M. K. Rao, and C. S. Rao",
      title: "Simultaneous Multiclass Retinal Lesion Segmentation Using Fully Automated RILBP-YNet in Diabetic Retinopathy",
      venue: "Biomedical Signal Processing and Control (Elsevier), vol. 86, p. 105156, 2023. DOI: 10.1016/j.bspc.2023.105156",
      objective: "To perform simultaneous, fine-grained semantic segmentation of four distinct DR microvascular lesions (microaneurysms, hemorrhages, hard exudates, and soft exudates) without inter-class interference.",
      methodology: "The authors designed a novel 'RILBP-YNet' architecture featuring a shared encoder and twin parallel decoder pathways (forming a Y-shape). The network incorporated Rotation Invariant Local Binary Patterns (RILBP) as an explicit hand-crafted texture prior concatenated with deep feature maps. One decoder focused on red lesions (microaneurysms and hemorrhages), while the second decoder focused on bright lesions (hard and soft exudates). Compound loss functions (Dice loss + Focal loss) addressed extreme class imbalance between lesion pixels and background retina.",
      dataset: "Trained and rigorously evaluated on the IDRiD (Indian Diabetic Retinopathy Image Dataset) and DDR datasets, both featuring verified pixel-level ground truth annotations.",
      results: "The RILBP-YNet achieved a Mean Intersection over Union (mIoU) of 78.4% across all four lesion categories, with individual F1-scores of 76.2% for microaneurysms, 82.5% for hemorrhages, 84.1% for hard exudates, and 79.8% for soft exudates, substantially outperforming standard U-Net and SegNet baselines.",
      limitations: "High computational complexity and memory usage due to dual decoder pathways, requiring high-end GPU hardware. Inference runtime was approximately 1.4 seconds per high-resolution fundus image, limiting real-time edge screening deployment.",
      futureScope: "Pruning redundant parameters using knowledge distillation and developing lightweight depthwise separable decoders suitable for embedded edge devices."
    },
    {
      id: 11,
      year: 2023,
      subheading: "2.11 Literature Review 11 (2023): CAD System for DR Using Modified Compact Convolutional Transformer",
      authors: "M. A. Al-Antari, M. A. Al-masni, and M. T. Choi",
      title: "A Computer-Aided Diagnostic System for Diabetic Retinopathy Using Modified Compact Convolutional Transformer",
      venue: "Biomedicines (MDPI), vol. 11, no. 8, p. 2190, 2023. DOI: 10.3390/biomedicines11082190",
      objective: "To combine the inductive bias and computational efficiency of convolutional layers with the long-range global self-attention of Vision Transformers, overcoming the massive pre-training data appetite of standard ViTs.",
      methodology: "The authors introduced a modified Compact Convolutional Transformer (CCT). Rather than segmenting fundus images into non-overlapping flat patches (as in standard ViT), the architecture applies convolutional tokenization blocks to preserve local spatial relationships and inductive bias. The extracted tokens are processed through multiple Multi-Head Self-Attention (MHSA) transformer encoders, followed by sequence pooling (which dynamically weights token importance) and a classification head. Images were preprocessed using CLAHE and standard normalization.",
      dataset: "Evaluated on the APTOS 2019 Blindness Detection dataset (3,662 images) and validated on Messidor-1 (1,200 images).",
      results: "The modified CCT model achieved 93.8% accuracy for binary detection, 88.7% accuracy for 5-class severity classification, and a QWK score of 0.928. Crucially, the model contained only 9.4 million parameters—over 85% fewer than a standard ViT-Base (86M parameters)—while training effectively from scratch without requiring large-scale ImageNet-21k pre-training.",
      limitations: "While global contextual dependencies were captured effectively, subtle microscopic lesions (isolated microaneurysms measuring 1-3 pixels) occasionally suffered attenuation during token pooling, resulting in lower recall for Grade 1 Mild NPDR.",
      futureScope: "Introducing dual-scale tokenization pathways that explicitly combine high-resolution local lesion tokens with global retinal context tokens."
    },
    {
      id: 12,
      year: 2024,
      subheading: "2.12 Literature Review 12 (2024): Dual-SwinOrd: Hierarchical Swin Transformer with Ordinal Regression for DR Grading",
      authors: "Y. Zhou, X. Sun, H. Zhang, L. Chen, and K. Wang",
      title: "Dual-SwinOrd: A Dual-Head Hierarchical Swin Transformer with Ordinal Regression for Diabetic Retinopathy Grading",
      venue: "Computers in Biology and Medicine (Elsevier), vol. 170, p. 108042, 2024. DOI: 10.1016/j.compbiomed.2024.108042",
      objective: "To address the clinical ordinal continuity of diabetic retinopathy progression and capture cross-scale long-range retinal features using a hierarchical shifted-window transformer with dual ordinal-categorical prediction heads.",
      methodology: "The framework deployed a hierarchical Swin Transformer backbone utilizing Shifted-Window Multi-Head Self-Attention (SW-MSA) to compute local and cross-window self-attention with linear computational complexity. The extracted representation was connected to a dual-head architecture: Head 1 performed standard categorical multi-class cross-entropy classification, while Head 2 executed ordinal regression using cumulative link logit loss to enforce ordinal distance constraints (penalizing distant grade errors more severely than adjacent ones). An attention-rollout mechanism generated interpretable visual lesion saliency maps.",
      dataset: "Comprehensively evaluated across three major benchmark datasets: APTOS 2019 (3,662 images), Kaggle EyePACS (35,126 images), and DDR (13,673 images).",
      results: "Dual-SwinOrd achieved a state-of-the-art Quadratic Weighted Kappa (QWK) of 0.941 on APTOS 2019, 5-class classification accuracy of 91.8%, and an AUC of 0.982 for referable DR detection. Ordinal loss integration dramatically reduced severe off-diagonal classification errors (e.g., misclassifying Grade 0 as Grade 3 or 4) to nearly zero.",
      limitations: "The model requires substantial GPU memory during training due to window shifting and multi-head self-attention mechanisms. Furthermore, the architecture relies exclusively on static 2D color fundus images without incorporating non-imaging systemic clinical risk indicators (such as patient HbA1c levels, diabetes duration, or blood pressure).",
      futureScope: "Constructing multi-modal clinical fusion frameworks that integrate optical fundus transformers with tabular electronic health records (EHR) and optical coherence tomography (OCT) volume scans."
    }
  ],

  comparativeTable: [
    {
      ref: "[1] Bodapati et al. (2020)",
      method: "Multi-modal ConvNet feature blending (VGG16 + ResNet50 + InceptionV3) + MLP",
      dataset: "EyePACS (35,126) & Messidor-1 (1,200)",
      metrics: "Acc: 84.3% (5-class), AUC: 0.941 (Referable DR), Sens: 88.7%, Spec: 92.4%",
      advantages: "Leverages complementary features from diverse CNN architectures; robust binary screening.",
      limitations: "High-dimensional feature space; high computational redundancy; no spatial lesion localization."
    },
    {
      ref: "[2] Shankar et al. (2020)",
      method: "Deep CNN + CLAHE + Meta-heuristic hyperparameter tuning (IWO / GWO)",
      dataset: "Messidor-1 (1,200) & DIARETDB0 (130)",
      metrics: "Acc: 97.4% (Binary), 92.1% (Multi-class), Sens: 96.2%, Spec: 98.1%",
      advantages: "Automated hyperparameter optimization avoids manual trial-and-error; high accuracy.",
      limitations: "High training computation across generations; evaluated only on small, curated datasets."
    },
    {
      ref: "[3] Kassani et al. (2020)",
      method: "Modified Xception with Deep Layer Aggregation (DLA) & depthwise separable conv",
      dataset: "EyePACS (35,126) & Messidor-2 (1,748)",
      metrics: "Acc: 83.2% (5-class), AUC: 0.924 (Referable DR), Sens: 86.5%, Spec: 91.0%",
      advantages: "Depthwise separable convolutions reduce parameters by 40%; multi-scale layer aggregation.",
      limitations: "Low sensitivity (68.4%) on Grade 1 (Mild NPDR); microaneurysms smoothed during striding."
    },
    {
      ref: "[4] Gour & Khanna (2021)",
      method: "Two-phase transfer learning (VGG-19 & ResNet-50) + multi-label BCE loss",
      dataset: "ODIR-5K (5,000 patients / 10,000 images)",
      metrics: "F1-score: 89.2% (DR), Mean AUC: 0.941 (across 8 ocular diseases)",
      advantages: "Multi-disease detection discriminates DR from glaucoma, cataract, and AMD comorbidity.",
      limitations: "Accuracy drops significantly under severe optical media opacities (cataracts/corneal haze)."
    },
    {
      ref: "[5] Alyoubi et al. (2021)",
      method: "Cascaded two-stage: YOLOv3 lesion localization + ResNet-50 DR severity grading",
      dataset: "IDRiD (516 images) & EyePACS",
      metrics: "mAP: 84.6% (Exudates), 81.2% (Hemorrhages); DR Acc: 89.4%, Sens: 91.2%",
      advantages: "Dual functionality: provides bounding-box lesion localization alongside disease grade.",
      limitations: "Bounding boxes lack pixel-level contour precision; requires costly manual bounding box labels."
    },
    {
      ref: "[6] Bilal et al. (2021)",
      method: "Mixed-model ensemble (DenseNet121 + ResNet101 + InceptionV3) + CLAHE",
      dataset: "APTOS 2019 (3,662) & Messidor-1 (1,200)",
      metrics: "Acc: 96.7% (Binary), 88.5% (5-class), QWK: 0.912, AUC: 0.954",
      advantages: "Heterogeneous ensemble mitigates individual model bias; targeted contrast preprocessing.",
      limitations: "High memory footprint during inference; misclassifications between adjacent grades (1 vs 2)."
    },
    {
      ref: "[7] Bodapati et al. (2021)",
      method: "Composite DNN (Xception + DenseNet169) with internal Gated-Attention Unit (GAU)",
      dataset: "EyePACS (35,126) & Messidor-2 (1,748)",
      metrics: "Acc: 87.1% (5-class), AUC: 0.958, Sens: 93.6%, Spec: 95.2%",
      advantages: "Gated attention highlights pathological lesion regions dynamically; suppresses background.",
      limitations: "Attention occasionally false-triggers on normal bright structures (optic disc margins)."
    },
    {
      ref: "[8] Atwany et al. (2022)",
      method: "Standardized benchmark: EfficientNet (B0-B5), RegNet, SimCLR self-supervised learning",
      dataset: "APTOS 2019, EyePACS, Messidor-2, DDR",
      metrics: "EfficientNet-B4: Acc: 84.9%, QWK: 0.924, AUC: 0.963; SSL gains +4.8% transfer",
      advantages: "Rigorous unified benchmark; demonstrates self-supervised pre-training transferability.",
      limitations: "Revealed severe domain shift: 14.2% drop in accuracy when evaluating models cross-dataset."
    },
    {
      ref: "[9] Bilal et al. (2022)",
      method: "Two-stage: Enhanced symmetrical U-Net vessel/lesion segmentation + CNN grading",
      dataset: "DRIVE, STARE & APTOS 2019 (3,662)",
      metrics: "Seg Acc: 96.8%, AUC: 0.981; DR Acc: 91.3% (Binary), 86.4% (5-class)",
      advantages: "Explicit morphological vessel and microvascular anomaly segmentation guides classification.",
      limitations: "Two-stage error propagation; high sequential latency (~1.8s/image); not end-to-end."
    },
    {
      ref: "[10] Pavani et al. (2023)",
      method: "RILBP-YNet: Dual-decoder YNet + Rotation Invariant Local Binary Patterns",
      dataset: "IDRiD & DDR (Pixel-level annotations)",
      metrics: "mIoU: 78.4% (all 4 lesions), F1: 76.2% (MA), 82.5% (HEM), 84.1% (EX)",
      advantages: "Simultaneous multi-class lesion segmentation separates red vs. bright lesions cleanly.",
      limitations: "High computational load; requires heavy GPU resources; not optimized for embedded devices."
    },
    {
      ref: "[11] Al-Antari et al. (2023)",
      method: "Modified Compact Convolutional Transformer (CCT) with sequence pooling",
      dataset: "APTOS 2019 (3,662) & Messidor-1 (1,200)",
      metrics: "Acc: 93.8% (Binary), 88.7% (5-class), QWK: 0.928; Only 9.4M parameters",
      advantages: "85% fewer parameters than ViT-Base; captures global self-attention without huge pre-training.",
      limitations: "Subtle microaneurysms attenuated during sequence pooling; slight recall drop on Grade 1."
    },
    {
      ref: "[12] Zhou et al. (2024)",
      method: "Dual-SwinOrd: Hierarchical Swin Transformer + Ordinal Regression & Categorical heads",
      dataset: "APTOS 2019, EyePACS, DDR (52,461 total)",
      metrics: "QWK: 0.941, Acc: 91.8% (5-class), AUC: 0.982 (Referable DR)",
      advantages: "Enforces clinical ordinal severity hierarchy; linear attention complexity via shifted windows.",
      limitations: "High training memory consumption; purely unimodal fundus imaging; no patient clinical data."
    }
  ],

  comparativeAnalysisText: {
    heading: "3. Comparative Analysis",
    subsections: [
      {
        title: "3.1 Architectural Paradigm Evolution: From Standard CNNs to Vision Transformers",
        content: "A longitudinal synthesis of literature from 2020 to 2024 reveals a decisive architectural evolution in deep learning for diabetic retinopathy detection. The early phase (2020–2021) was dominated by standard transfer-learning Convolutional Neural Networks (VGG, ResNet, Inception, Xception) applied as monolithic backbones or blended ensembles [1, 2, 4, 6]. While effective for binary classification (referable vs. non-referable DR), standard CNNs faced inherent structural limitations: fixed receptive fields struggle to model long-range spatial dependencies across the retinal hemisphere, while aggressive spatial pooling downsamples and obliterates subtle, fine-grained microvascular cues such as isolated microaneurysms. To mitigate these drawbacks, researchers introduced attention-augmented architectures [7] and multi-stage detection systems [5, 9] to explicitly direct spatial focus toward pathological lesion clusters. However, the paradigm shifted dramatically between 2023 and 2024 with the adoption of Vision Transformers (ViT) [11, 12]. Modern hierarchical Vision Transformers, notably the Shifted-Window Swin Transformer [12] and Compact Convolutional Transformers [11], combine local inductive bias with global self-attention mechanisms. This enables the model to simultaneously inspect localized micro-lesions (e.g., punctate hemorrhages) and global retinal topologies (e.g., bilateral venous dilation and diffuse retinal ischemia), resulting in superior Quadratic Weighted Kappa (QWK) scores exceeding 0.94."
      },
      {
        title: "3.2 Benchmark Datasets, Preprocessing Strategies, and Quality Variations",
        content: "Across the reviewed studies, five primary benchmark datasets dominate the literature: Kaggle EyePACS (35,126 images), Messidor-1/2 (1,200 to 1,748 images), APTOS 2019 (3,662 images), IDRiD (516 images), and DDR (13,673 images). Each repository presents distinct optical characteristics and clinical contexts. Messidor datasets consist of highly curated, macula-centered photographs obtained under controlled French clinical protocols. Conversely, EyePACS and APTOS 2019 reflect real-world screening conditions featuring substantial variations in camera field of view (45° vs. 50°), lighting irregularities, motion blur, and non-uniform pupil dilation. To harmonize these discrepancies, top-performing studies consistently rely on specialized optical preprocessing. Ben Graham's method—which applies local color averaging followed by subtraction—effectively eliminates inter-camera illumination gradients. Similarly, green-channel extraction combined with Contrast-Limited Adaptive Histogram Equalization (CLAHE) dramatically enhances vascular and microaneurysm contrast, providing critical signal amplification for downstream classifiers [2, 6]."
      },
      {
        title: "3.3 Loss Formulations and Class Imbalance Resolution",
        content: "A critical methodological insight emerging from the comparative analysis is the limitation of standard categorical cross-entropy loss for multi-class DR grading. Retinal screening datasets exhibit severe class imbalance, where normal images (Grade 0) typically account for 60–75% of the repository, while severe NPDR (Grade 3) represents less than 5%. Models trained with standard cross-entropy exhibit a severe majority-class bias, achieving high overall accuracy while failing clinically to detect early or severe stages. Furthermore, categorical cross-entropy treats all classification mistakes identically: misclassifying a Grade 0 (Normal) patient as Grade 1 (Mild) incurs the exact same loss penalty as misclassifying Grade 0 as Grade 4 (Proliferative DR), which is clinically unacceptable. Studies published between 2022 and 2024 overcome this through compound loss functions. The integration of Focal Loss and Asymmetric Loss addresses class frequency skews by dynamically downweighting easy-to-classify normal samples. Crucially, Zhou et al. [12] demonstrated that integrating Ordinal Regression Loss enforces disease progression penalties, virtually eliminating catastrophic off-diagonal diagnostic errors and elevating the Quadratic Weighted Kappa metric to clinical-grade reliability."
      },
      {
        title: "3.4 Model Interpretability and Lesion Grounding",
        content: "Clinical acceptance of deep learning CAD systems is fundamentally contingent upon explainability. Early models [1, 2, 3] operated strictly as opaque black-box classifiers, generating probability scores without spatial justification. Between 2021 and 2023, two diverging strategies emerged to provide clinical interpretability: (1) explicit two-stage pipelines combining object detectors (YOLO) or semantic segmentors (U-Net, YNet) to produce physical lesion bounding boxes or pixel masks [5, 9, 10]; and (2) internal attention heatmaps (Grad-CAM, Grad-CAM++, and transformer attention-rollout maps) [7, 11, 12]. While explicit segmentation provides precise morphological boundaries, it incurs heavy computational latency and requires massive, expensive pixel-level manual annotations. Conversely, attention-rollout mechanisms in Vision Transformers provide weakly supervised, lesion-aware saliency maps dynamically without requiring any manual bounding box annotations, striking an optimal balance between clinical interpretability and computational efficiency."
      }
    ]
  },

  researchGaps: {
    heading: "4. Research Gap",
    leadParagraph: "Despite remarkable advancements in deep learning models for diabetic retinopathy, a critical examination of the literature reveals five major unresolved research gaps that hinder seamless, reliable real-world clinical translation:",
    gaps: [
      {
        number: "4.1",
        title: "Domain Shift and Inadequate Cross-Dataset Generalization",
        content: "The vast majority of existing deep learning models demonstrate outstanding performance when evaluated on internal test sets derived from the same distribution as their training data. However, as quantitatively benchmarked by Atwany et al. [8], when these models are evaluated zero-shot across external clinical cohorts captured using different fundus camera hardware (e.g., Zeiss vs. Topcon vs. Canon), varying patient ethnicities with diverse fundus pigmentation, or smartphone-based portable screening devices, classification accuracy drops precipitously by 12% to 18%. Current models fail to learn domain-invariant representations, remaining highly susceptible to superficial image acquisition artifacts rather than underlying pathophysiology."
      },
      {
        number: "4.2",
        title: "Severe Sensitivity Deficits in Early-Stage (Mild NPDR) Detection",
        content: "Clinical guidelines emphasize that early intervention yields the greatest preventative value. However, nearly all reviewed deep learning models exhibit their lowest sensitivity and recall on Grade 1 (Mild NPDR), frequently dropping below 70% [1, 3, 6, 11]. The primary pathological hallmark of Mild NPDR consists exclusively of tiny microaneurysms (often spanning only 2–5 pixels on high-resolution fundus images). Standard convolutional downsampling, spatial striding, and aggressive patch tokenization systematically smooth out or discard these minute vascular signals, leading to false-negative diagnoses during the most critical early therapeutic window."
      },
      {
        number: "4.3",
        title: "Opaque Clinical Explainability and Lack of Fine-Grained Lesion Grounding",
        content: "While saliency visualization tools such as Grad-CAM and attention rollout have become standard, they frequently produce coarse, diffuse heatmaps that highlight broad retinal regions rather than delineating specific clinical microvascular lesions. Furthermore, attention maps frequently trigger false activations on healthy anatomical boundaries, such as the optic disc margin or choroidal crescents [7]. In clinical practice, ophthalmologists cannot rely on coarse heatmaps to make high-stakes laser treatment or surgical decisions; there is an urgent need for models that provide fine-grained, lesion-grounded explainability indicating exactly which microvascular biomarkers (microaneurysms, hemorrhages, hard exudates) justified the assigned severity grade."
      },
      {
        number: "4.4",
        title: "High Computational Complexity and Lack of Edge-Device Optimization",
        content: "State-of-the-art architectures achieving top diagnostic benchmarks—such as multi-model CNN ensembles [1, 6], cascaded U-Net/YNet pipelines [9, 10], and large Vision Transformers [12]—rely on millions of parameters and heavy floating-point operations (FLOPs). These models require high-end, power-hungry desktop GPU workstations to perform inference. In contrast, the most urgent real-world clinical need for automated DR screening exists in rural community health posts, primary care clinics, and mobile screening vans in developing countries, where only low-power tablets, smartphones, or edge AI accelerators (e.g., Raspberry Pi, Jetson Nano) are available. There is a distinct scarcity of lightweight, edge-optimized architectures capable of delivering clinical-grade multi-class DR grading under strict latency and memory constraints."
      },
      {
        number: "4.5",
        title: "Disconnection Between Retinal Imaging and Systemic Clinical Risk Factors",
        content: "Existing deep learning diagnostic frameworks operate in complete clinical isolation, relying exclusively on static 2D color fundus photographs. However, in routine medical practice, ophthalmologists and endocrinologists interpret retinal imaging within the context of the patient's systemic clinical profile—including glycated hemoglobin (HbA1c) levels, duration of diabetes, systemic hypertension, lipid panels, and renal function (microalbuminuria). A patient with borderline moderate NPDR and an HbA1c of 11.5% faces an exponentially higher immediate risk of rapid progression than an identical patient with tightly controlled blood sugar. Current literature exhibits a major gap in multimodal data fusion architectures capable of synergistically synthesizing high-resolution retinal imaging with structured Electronic Health Record (EHR) clinical features."
      }
    ]
  },

  conclusionAndRoadmap: {
    heading: "5. Conclusion and Proposed System Roadmap",
    conclusionText: [
      "This comprehensive literature survey has critically evaluated twelve state-of-the-art deep learning research papers published between 2020 and 2024 for automated diabetic retinopathy detection, severity grading, and lesion segmentation. The survey systematically mapped the paradigm progression from early pre-trained CNN transfer learning and multi-model ensembling to modern attention-gated networks, deep segmentation pipelines, and hierarchical Vision Transformers.",
      "The comparative analysis confirmed that while automated binary screening (referable vs. non-referable DR) has achieved high sensitivity (>92%) and specificity (>95%), multi-class 5-grade severity classification remains challenged by severe class imbalance, cross-camera domain shift, low sensitivity for subtle Grade 1 microaneurysms, opaque black-box decision boundaries, and heavy computational requirements. These critical findings provide clear motivation and architectural direction for designing an advanced, next-generation computer-aided diagnostic framework."
    ],
    proposedRoadmapHeading: "5.1 Proposed Methodological Architecture and Research Roadmap",
    proposedRoadmapText: [
      "Motivated directly by the five identified research gaps, this study proposes an innovative, lightweight, clinically explainable, and edge-deployable deep learning framework: The Hybrid CNN-Swin Transformer with Lesion-Aware Cross-Attention (LACAM) and Ordinal Focal Loss for Robust Diabetic Retinopathy Grading.",
      "The proposed architectural blueprint comprises five integrated modules:",
      "1. Optical Preprocessing & Artifact Suppression Pipeline: Raw fundus photographs are normalized using an automated circular cropping mask, followed by green-channel extraction and adaptive CLAHE contrast enhancement. Additionally, an explicit optic disc localization mask is generated to prevent false-positive attention activation on normal peripapillary boundaries.",
      "2. Dual-Scale Feature Extraction Backbone: To resolve the conflict between fine-grained micro-lesion capture and global contextual understanding without incurring massive computational bloat, the architecture implements a dual-stream hybrid design:",
      "   • Local Lesion Stream: A lightweight convolutional backbone (MobileNetV4 or EfficientNet-B0) operating on high-resolution image patches to preserve fine-grained spatial inductive biases, specifically capturing tiny 2–5 pixel microaneurysms and dot hemorrhages.",
      "   • Global Context Stream: A compact hierarchical Shifted-Window Swin Transformer (Swin-T) backbone to compute long-range cross-window self-attention across the full retinal field with linear computational complexity, modeling diffuse retinal ischemia and vessel tortuosity.",
      "3. Lesion-Aware Cross-Attention Module (LACAM): A lightweight cross-attention bridge that dynamically queries local convolutional feature maps using the global transformer tokens as keys and values. This enables the model to selectively amplify features corresponding to verified microvascular lesions while suppressing irrelevant choroidal and background camera noise.",
      "4. Dual Prediction Head with Ordinal Focal Loss: The output embeddings are connected to twin prediction heads: a classification head and an ordinal ranking head. The network is trained using a compound Ordinal Focal Loss that simultaneously compensates for extreme class imbalance (heavily penalizing rare Grade 1 and Grade 3 errors) and enforces clinical ordinal continuity (penalizing distant grade errors quadratically).",
      "5. Clinically Grounded Explainability Engine: An integrated Grad-CAM++ visualization module renders multi-scale heatmaps that highlight exact spatial lesion coordinates alongside predicted severity grades, providing transparent, trustworthy visual rationales for clinical screening personnel.",
      "By combining lightweight convolutional inductive bias, shifted-window self-attention, ordinal loss optimization, and lesion-grounded visual heatmaps, the proposed framework directly resolves the limitations of existing systems, offering a viable, highly accurate, and deployable solution for automated diabetic retinopathy screening in clinical and community healthcare environments."
    ]
  },

  references: [
    {
      id: 1,
      citation: "J. D. Bodapati, V. Dondeti, S. N. Shareef, and V. Naralasetti, \"Blended multi-modal deep ConvNet features for diabetic retinopathy severity prediction,\" Electronics, vol. 9, no. 6, p. 914, 2020. DOI: 10.3390/electronics9060914."
    },
    {
      id: 2,
      citation: "K. Shankar, E. Perumal, M. Elhoseny, and P. T. Nguyen, \"Hyperparameter tuning deep learning for diabetic retinopathy fundus image classification,\" IEEE Access, vol. 8, pp. 118166–118174, 2020. DOI: 10.1109/ACCESS.2020.3005152."
    },
    {
      id: 3,
      citation: "S. H. Kassani, P. H. Kassani, R. Khazaeinezhad, M. J. Wesolowski, K. A. Schneider, and R. Deters, \"Diabetic retinopathy classification using a modified Xception architecture,\" in Proc. IEEE 19th Int. Symp. Signal Process. Inf. Technol. (ISSPIT), 2020, pp. 1–6. DOI: 10.1109/ISSPIT51521.2020.9408891."
    },
    {
      id: 4,
      citation: "N. Gour and P. Khanna, \"Multi-class multi-label ophthalmological disease detection using transfer learning based convolutional neural network,\" Biomed. Signal Process. Control, vol. 66, p. 102329, 2021. DOI: 10.1016/j.bspc.2021.102329."
    },
    {
      id: 5,
      citation: "W. L. Alyoubi, W. M. Shalash, and M. F. Abulkhair, \"Diabetic retinopathy fundus image classification and lesions localization system using deep learning,\" Sensors, vol. 21, no. 11, p. 3704, 2021. DOI: 10.3390/s21113704."
    },
    {
      id: 6,
      citation: "A. Bilal, L. Sun, and S. Mazhar, \"Diabetic retinopathy detection and classification using mixed models for a disease grading database,\" IEEE Access, vol. 9, pp. 23544–23553, 2021. DOI: 10.1109/ACCESS.2021.3056187."
    },
    {
      id: 7,
      citation: "J. D. Bodapati, S. N. Shareef, V. Naralasetti, and N. B. Hakak, \"Composite deep neural network with gated-attention mechanism for diabetic retinopathy severity classification,\" J. Ambient Intell. Humaniz. Comput., vol. 12, pp. 9825–9839, 2021. DOI: 10.1007/s12652-020-02728-6."
    },
    {
      id: 8,
      citation: "M. Z. Atwany, A. H. Sahyoun, and M. Yaqub, \"Deep learning techniques for diabetic retinopathy classification: A survey and comparative benchmark,\" IEEE Access, vol. 10, pp. 28642–28655, 2022. DOI: 10.1109/ACCESS.2022.3157632."
    },
    {
      id: 9,
      citation: "A. Bilal, G. Sun, Y. Li, S. Mazhar, and A. Q. Khan, \"AI-based automatic detection and classification of diabetic retinopathy using U-Net and deep learning,\" Symmetry, vol. 14, no. 7, p. 1427, 2022. DOI: 10.3390/sym14071427."
    },
    {
      id: 10,
      citation: "P. G. Pavani, M. K. Rao, and C. S. Rao, \"Simultaneous multiclass retinal lesion segmentation using fully automated RILBP-YNet in diabetic retinopathy,\" Biomed. Signal Process. Control, vol. 86, p. 105156, 2023. DOI: 10.1016/j.bspc.2023.105156."
    },
    {
      id: 11,
      citation: "M. A. Al-Antari, M. A. Al-masni, and M. T. Choi, \"A computer-aided diagnostic system for diabetic retinopathy using modified compact convolutional transformer,\" Biomedicines, vol. 11, no. 8, p. 2190, 2023. DOI: 10.3390/biomedicines11082190."
    },
    {
      id: 12,
      citation: "Y. Zhou, X. Sun, H. Zhang, L. Chen, and K. Wang, \"Dual-SwinOrd: A dual-head hierarchical Swin Transformer with ordinal regression for diabetic retinopathy grading,\" Comput. Biol. Med., vol. 170, p. 108042, 2024. DOI: 10.1016/j.compbiomed.2024.108042."
    },
    {
      id: 13,
      citation: "C. P. Wilkinson et al., \"Proposed international clinical diabetic retinopathy and diabetic macular edema disease severity scales,\" Ophthalmology, vol. 110, no. 9, pp. 1677–1682, 2003. DOI: 10.1016/S0161-6420(03)00475-5."
    },
    {
      id: 14,
      citation: "V. Gulshan et al., \"Development and validation of a deep learning algorithm for detection of diabetic retinopathy in retinal fundus photographs,\" JAMA, vol. 316, no. 22, pp. 2402–2410, 2016. DOI: 10.1001/jama.2016.17216."
    },
    {
      id: 15,
      citation: "International Diabetes Federation, IDF Diabetes Atlas, 10th ed. Brussels, Belgium: International Diabetes Federation, 2021. [Online]. Available: https://www.diabetesatlas.org"
    },
    {
      id: 16,
      citation: "Z. Liu et al., \"Swin Transformer: Hierarchical vision transformer using shifted windows,\" in Proc. IEEE/CVF Int. Conf. Comput. Vis. (ICCV), 2021, pp. 10012–10022."
    }
  ]
};
