const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  convertInchesToTwip,
  ShadingType
} = require("docx");

const reportData = require("./report_data.js");

// Styles helper functions
function pBody(text, options = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, font: "Times New Roman", size: 24 })];
  return new Paragraph({
    alignment: options.alignment || AlignmentType.JUSTIFIED,
    spacing: {
      line: 360, // 1.5 line spacing
      lineRule: "auto",
      before: options.before !== undefined ? options.before : 0,
      after: options.after !== undefined ? options.after : 140,
    },
    children: runs
  });
}

function pBullet(boldPrefix, normalText) {
  return new Paragraph({
    bullet: { level: 0 },
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 360, lineRule: "auto", before: 60, after: 100 },
    children: [
      new TextRun({ text: boldPrefix + " ", bold: true, font: "Times New Roman", size: 24 }),
      new TextRun({ text: normalText, font: "Times New Roman", size: 24 })
    ]
  });
}

function pHeading1(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.LEFT,
    spacing: { before: 360, after: 160, line: 360, lineRule: "auto" },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: "Times New Roman",
        size: 28, // 14 pt
        color: "0F294A"
      })
    ]
  });
}

function pHeading2(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { before: 260, after: 120, line: 360, lineRule: "auto" },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: "Times New Roman",
        size: 26, // 13 pt
        color: "1A365D"
      })
    ]
  });
}

function pHeading3(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    alignment: AlignmentType.LEFT,
    spacing: { before: 180, after: 80, line: 360, lineRule: "auto" },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font: "Times New Roman",
        size: 24, // 12 pt
        color: "2D3748"
      })
    ]
  });
}

// Build DOCX document
async function buildDocx() {
  console.log("Constructing DOCX elements...");

  const docChildren = [];

  // -------------------------------------------------------------
  // TITLE PAGE
  // -------------------------------------------------------------
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 600, after: 120 },
      children: [
        new TextRun({
          text: reportData.metadata.department.toUpperCase(),
          bold: true,
          font: "Times New Roman",
          size: 28,
          color: "1A365D"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 80, after: 400 },
      children: [
        new TextRun({
          text: reportData.metadata.institution.toUpperCase(),
          bold: true,
          font: "Times New Roman",
          size: 26,
          color: "2D3748"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 100 },
      children: [
        new TextRun({
          text: `COURSE: ${reportData.metadata.course.toUpperCase()}`,
          bold: true,
          font: "Times New Roman",
          size: 26,
          color: "2B6CB0"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 500 },
      children: [
        new TextRun({
          text: `${reportData.metadata.taskNumber}: ${reportData.metadata.taskTitle.toUpperCase()}`,
          bold: true,
          font: "Times New Roman",
          size: 26,
          color: "2B6CB0"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
      children: [
        new TextRun({
          text: "LITERATURE SURVEY REPORT",
          bold: true,
          font: "Times New Roman",
          size: 32, // 16 pt
          color: "0F294A"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 600 },
      children: [
        new TextRun({
          text: reportData.metadata.documentTitle,
          bold: true,
          font: "Times New Roman",
          size: 36, // 18 pt
          color: "1A365D"
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 600, after: 80 },
      children: [
        new TextRun({
          text: "Submitted by:",
          italics: true,
          font: "Times New Roman",
          size: 24
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 60 },
      children: [
        new TextRun({
          text: reportData.metadata.studentName,
          bold: true,
          font: "Times New Roman",
          size: 26
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 400 },
      children: [
        new TextRun({
          text: `Register / Roll No: ${reportData.metadata.registerNumber}`,
          font: "Times New Roman",
          size: 24
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 80 },
      children: [
        new TextRun({
          text: `Date of Submission: ${reportData.metadata.submissionDate}`,
          bold: true,
          font: "Times New Roman",
          size: 24
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 200 },
      children: [
        new TextRun({
          text: `Academic Year: ${reportData.metadata.academicYear}`,
          font: "Times New Roman",
          size: 24
        })
      ]
    }),
    // Page break after title page
    new Paragraph({
      pageBreakBefore: true,
      children: []
    })
  );

  // -------------------------------------------------------------
  // TABLE OF CONTENTS SUMMARY / OUTLINE
  // -------------------------------------------------------------
  docChildren.push(
    pHeading1("Table of Contents"),
    pBullet("1. Introduction", "Clinical background, ICDR staging (0-4), epidemiology, screening challenges, CAD rationale, and survey objectives."),
    pBullet("2. Review of Literature", "Chronological review of 12 landmark peer-reviewed research papers (2020–2024) covering objectives, architectures, datasets, findings, limitations, and future scope."),
    pBullet("3. Comparative Analysis", "Comprehensive 12-study analytical matrix (Table 1) and in-depth synthesis of model architectures, datasets, loss functions, and interpretability."),
    pBullet("4. Research Gap", "Detailed dissection of 5 key open challenges: domain shift, mild DR sensitivity, black-box explainability, edge-device constraints, and multimodal clinical data absence."),
    pBullet("5. Conclusion and Proposed System Roadmap", "Synthesis of survey findings and detailed architectural specification of the proposed Hybrid CNN-Swin Transformer with Lesion-Aware Cross-Attention (LACAM)."),
    pBullet("6. References", "Complete bibliographic citations in standard IEEE format."),
    new Paragraph({
      pageBreakBefore: true,
      children: []
    })
  );

  // -------------------------------------------------------------
  // SECTION 1: INTRODUCTION
  // -------------------------------------------------------------
  docChildren.push(pHeading1(reportData.introduction.heading));
  for (const para of reportData.introduction.paragraphs) {
    docChildren.push(pBody(para));
  }

  // -------------------------------------------------------------
  // SECTION 2: REVIEW OF LITERATURE (12 PAPERS CHRONOLOGICAL)
  // -------------------------------------------------------------
  docChildren.push(
    pHeading1("2. Review of Literature"),
    pBody("This section presents a rigorous, chronological critical review of twelve landmark empirical research papers on deep learning-based diabetic retinopathy analysis published between 2020 and 2024 in premier venues (IEEE Xplore, ScienceDirect/Elsevier, Springer, MDPI). For each study, the research problem, methodology, dataset, findings, limitations, and future scope are comprehensively analyzed.")
  );

  for (const paper of reportData.papers) {
    docChildren.push(
      pHeading2(paper.subheading),
      pBullet("Author(s) and Year:", paper.authors + ` (${paper.year})`),
      pBullet("Title of the Paper:", `"${paper.title}"`),
      pBullet("Publication Venue & Citation:", paper.venue),
      pBullet("Research Objective / Problem:", paper.objective),
      pBullet("Methodology & Architecture:", paper.methodology),
      pBullet("Dataset & Experimental Setup:", paper.dataset),
      pBullet("Key Results & Quantitative Findings:", paper.results),
      pBullet("Limitations Identified:", paper.limitations),
      pBullet("Possible Future Scope:", paper.futureScope)
    );
  }

  // -------------------------------------------------------------
  // SECTION 3: COMPARATIVE ANALYSIS (TABLE + DISCUSSION)
  // -------------------------------------------------------------
  docChildren.push(
    new Paragraph({
      pageBreakBefore: true,
      children: []
    }),
    pHeading1(reportData.comparativeAnalysisText.heading),
    pBody("To establish a rigorous, holistic comparison of the reviewed state-of-the-art methodologies, Table 1 synthesizes all twelve studies across six critical dimensions: author and year, proposed architecture, benchmark dataset(s), quantitative performance metrics, core advantages, and critical limitations.")
  );

  // Build Comparative Table
  const tableRows = [];

  // Header Row
  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createTableCellDocx("Study & Ref", true, 14),
        createTableCellDocx("Methodology & Architecture", true, 20),
        createTableCellDocx("Dataset & Size", true, 16),
        createTableCellDocx("Performance Metrics", true, 20),
        createTableCellDocx("Key Advantages", true, 15),
        createTableCellDocx("Critical Limitations", true, 15)
      ]
    })
  );

  // Data Rows
  reportData.comparativeTable.forEach((item, idx) => {
    const isAlt = idx % 2 === 1;
    tableRows.push(
      new TableRow({
        children: [
          createTableCellDocx(item.ref, false, 14, isAlt),
          createTableCellDocx(item.method, false, 20, isAlt),
          createTableCellDocx(item.dataset, false, 16, isAlt),
          createTableCellDocx(item.metrics, false, 20, isAlt),
          createTableCellDocx(item.advantages, false, 15, isAlt),
          createTableCellDocx(item.limitations, false, 15, isAlt)
        ]
      })
    );
  });

  const comparativeTableDocx = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "A0AEC0" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "A0AEC0" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "A0AEC0" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "A0AEC0" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "E2E8F0" },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: "E2E8F0" }
    },
    rows: tableRows
  });

  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 160, after: 120 },
      children: [
        new TextRun({
          text: "Table 1: Systematic Comparative Analysis of Deep Learning Frameworks for Diabetic Retinopathy Detection (2020–2024)",
          bold: true,
          font: "Times New Roman",
          size: 22,
          color: "1A365D"
        })
      ]
    }),
    comparativeTableDocx,
    new Paragraph({ spacing: { before: 200, after: 100 }, children: [] })
  );

  // Subsections for Comparative Analysis
  for (const sub of reportData.comparativeAnalysisText.subsections) {
    docChildren.push(
      pHeading2(sub.title),
      pBody(sub.content)
    );
  }

  // -------------------------------------------------------------
  // SECTION 4: RESEARCH GAP
  // -------------------------------------------------------------
  docChildren.push(
    pHeading1(reportData.researchGaps.heading),
    pBody(reportData.researchGaps.leadParagraph)
  );

  for (const gap of reportData.researchGaps.gaps) {
    docChildren.push(
      pHeading2(`${gap.number} ${gap.title}`),
      pBody(gap.content)
    );
  }

  // -------------------------------------------------------------
  // SECTION 5: CONCLUSION & PROPOSED ROADMAP
  // -------------------------------------------------------------
  docChildren.push(
    pHeading1(reportData.conclusionAndRoadmap.heading)
  );

  for (const cPara of reportData.conclusionAndRoadmap.conclusionText) {
    docChildren.push(pBody(cPara));
  }

  docChildren.push(
    pHeading2(reportData.conclusionAndRoadmap.proposedRoadmapHeading)
  );

  for (const rPara of reportData.conclusionAndRoadmap.proposedRoadmapText) {
    if (rPara.startsWith("•") || rPara.startsWith("   •")) {
      docChildren.push(pBullet(rPara.split(":")[0], rPara.split(":").slice(1).join(":")));
    } else {
      docChildren.push(pBody(rPara));
    }
  }

  // -------------------------------------------------------------
  // SECTION 6: REFERENCES (IEEE STYLE)
  // -------------------------------------------------------------
  docChildren.push(
    new Paragraph({
      pageBreakBefore: true,
      children: []
    }),
    pHeading1("6. References")
  );

  for (const ref of reportData.references) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: 360, lineRule: "auto", before: 40, after: 100 },
        children: [
          new TextRun({
            text: `[${ref.id}] `,
            bold: true,
            font: "Times New Roman",
            size: 24
          }),
          new TextRun({
            text: ref.citation,
            font: "Times New Roman",
            size: 24
          })
        ]
      })
    );
  }

  // Document Assembly with strict 1-inch margins and A4 dimensions
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 11906, // A4 width (twips)
              height: 16838 // A4 height (twips)
            },
            margin: {
              top: 1440,    // 1 inch
              bottom: 1440, // 1 inch
              left: 1440,   // 1 inch
              right: 1440   // 1 inch
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 120 },
                children: [
                  new TextRun({
                    text: "Task-1: Literature Survey on Diabetic Retinopathy Detection Using Deep Learning",
                    font: "Times New Roman",
                    size: 18,
                    italics: true,
                    color: "718096"
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 120 },
                children: [
                  new TextRun({
                    text: "Page ",
                    font: "Times New Roman",
                    size: 20,
                    color: "718096"
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: "Times New Roman",
                    size: 20,
                    bold: true,
                    color: "1A365D"
                  }),
                  new TextRun({
                    text: " of ",
                    font: "Times New Roman",
                    size: 20,
                    color: "718096"
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    font: "Times New Roman",
                    size: 20,
                    bold: true,
                    color: "1A365D"
                  })
                ]
              })
            ]
          })
        },
        children: docChildren
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const docxOutputPath = path.join(__dirname, "TASK-1_Literature_Survey_Report.docx");
  fs.writeFileSync(docxOutputPath, buffer);
  console.log(`DOCX report successfully generated at: ${docxOutputPath}`);
}

function createTableCellDocx(text, isHeader = false, widthPercent = 16.66, isAltRow = false) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: isHeader
      ? { fill: "1A365D", type: ShadingType.CLEAR }
      : (isAltRow ? { fill: "F7FAFC", type: ShadingType.CLEAR } : undefined),
    margins: { top: 120, bottom: 120, left: 120, right: 120 },
    children: [
      new Paragraph({
        alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT,
        spacing: { line: 260, before: 40, after: 40 },
        children: [
          new TextRun({
            text: text,
            bold: isHeader,
            font: "Times New Roman",
            size: isHeader ? 20 : 18, // 10pt for header, 9pt for body cells
            color: isHeader ? "FFFFFF" : "1A202C"
          })
        ]
      })
    ]
  });
}

// Build Markdown Version
function buildMarkdown() {
  console.log("Generating Markdown report...");
  let md = "";

  md += `# ${reportData.metadata.documentTitle}\n\n`;
  md += `**Course:** ${reportData.metadata.course}  \n`;
  md += `**Assignment:** ${reportData.metadata.taskNumber} - ${reportData.metadata.taskTitle}  \n`;
  md += `**Department:** ${reportData.metadata.department}  \n`;
  md += `**Institution:** ${reportData.metadata.institution}  \n`;
  md += `**Candidate Name:** ${reportData.metadata.studentName}  \n`;
  md += `**Register / Roll No:** ${reportData.metadata.registerNumber}  \n`;
  md += `**Submission Date:** ${reportData.metadata.submissionDate}  \n`;
  md += `**Academic Year:** ${reportData.metadata.academicYear}  \n\n`;
  md += `---\n\n`;

  // Introduction
  md += `## 1. Introduction\n\n`;
  for (const para of reportData.introduction.paragraphs) {
    md += `${para}\n\n`;
  }

  // Review of Literature
  md += `## 2. Review of Literature\n\n`;
  md += `This section presents a chronological critical review of twelve landmark empirical research papers on deep learning-based diabetic retinopathy analysis published between 2020 and 2024. Each paper is comprehensively evaluated across its research problem, methodology, dataset, quantitative findings, limitations, and future scope.\n\n`;

  for (const paper of reportData.papers) {
    md += `### ${paper.subheading}\n\n`;
    md += `- **Author(s) and Year:** ${paper.authors} (${paper.year})\n`;
    md += `- **Title of the Paper:** *${paper.title}*\n`;
    md += `- **Publication Venue & Citation:** ${paper.venue}\n`;
    md += `- **Research Objective / Problem:** ${paper.objective}\n`;
    md += `- **Methodology & Algorithm:** ${paper.methodology}\n`;
    md += `- **Dataset & Experimental Setup:** ${paper.dataset}\n`;
    md += `- **Key Results & Quantitative Findings:** ${paper.results}\n`;
    md += `- **Limitations Identified:** ${paper.limitations}\n`;
    md += `- **Possible Future Scope:** ${paper.futureScope}\n\n`;
  }

  // Comparative Analysis
  md += `## 3. Comparative Analysis\n\n`;
  md += `### Table 1: Systematic Comparative Analysis of Deep Learning Frameworks for Diabetic Retinopathy Detection (2020–2024)\n\n`;
  md += `| Study & Citation | Proposed Architecture / Methodology | Benchmark Dataset(s) | Key Performance Metrics | Key Advantages | Critical Limitations |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  for (const item of reportData.comparativeTable) {
    md += `| **${item.ref}** | ${item.method} | ${item.dataset} | ${item.metrics} | ${item.advantages} | ${item.limitations} |\n`;
  }
  md += `\n`;

  for (const sub of reportData.comparativeAnalysisText.subsections) {
    md += `### ${sub.title}\n\n${sub.content}\n\n`;
  }

  // Research Gap
  md += `## 4. Research Gap\n\n`;
  md += `${reportData.researchGaps.leadParagraph}\n\n`;

  for (const gap of reportData.researchGaps.gaps) {
    md += `### ${gap.number} ${gap.title}\n\n${gap.content}\n\n`;
  }

  // Conclusion and Roadmap
  md += `## 5. Conclusion and Proposed System Roadmap\n\n`;
  for (const cPara of reportData.conclusionAndRoadmap.conclusionText) {
    md += `${cPara}\n\n`;
  }

  md += `### ${reportData.conclusionAndRoadmap.proposedRoadmapHeading}\n\n`;
  for (const rPara of reportData.conclusionAndRoadmap.proposedRoadmapText) {
    md += `${rPara}\n\n`;
  }

  // References
  md += `## 6. References\n\n`;
  for (const ref of reportData.references) {
    md += `[${ref.id}] ${ref.citation}\n\n`;
  }

  const mdOutputPath = path.join(__dirname, "TASK-1_Literature_Survey_Report.md");
  fs.writeFileSync(mdOutputPath, md, "utf8");
  console.log(`Markdown report successfully generated at: ${mdOutputPath}`);
}

async function main() {
  await buildDocx();
  buildMarkdown();
  console.log("All Task-1 report documents generated successfully!");
}

main().catch(err => {
  console.error("Error generating reports:", err);
  process.exit(1);
});
