import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=120, bottom=120, left=180, right=180):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def add_header_footer(doc, title_text):
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        
        # Header
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run(f"{title_text} | Antigravity Research")
        hrun.font.name = 'Arial'
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(120, 120, 120)
        
        # Footer
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Báo Cáo Nghiên Cứu Khoa Học — Hệ Thống Đánh Giá Tính Cách & Phong Cách Xã Hội 4 Nhóm")
        frun.font.name = 'Arial'
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(120, 120, 120)

def add_title(doc, main_title, subtitle, version_date):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run(main_title)
    run.font.name = 'Arial'
    run.font.size = Pt(20)
    run.font.bold = True
    run.font.color.rgb = RGBColor(30, 58, 138) # Navy Blue
    
    p2 = doc.add_paragraph()
    p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p2.paragraph_format.space_before = Pt(2)
    p2.paragraph_format.space_after = Pt(6)
    run2 = p2.add_run(subtitle)
    run2.font.name = 'Arial'
    run2.font.size = Pt(12)
    run2.font.color.rgb = RGBColor(79, 70, 229) # Indigo
    
    p3 = doc.add_paragraph()
    p3.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p3.paragraph_format.space_before = Pt(0)
    p3.paragraph_format.space_after = Pt(18)
    run3 = p3.add_run(f"Ngày cập nhật: {version_date} | Tác giả: Antigravity Research Engine")
    run3.font.name = 'Arial'
    run3.font.size = Pt(9.5)
    run3.font.italic = True
    run3.font.color.rgb = RGBColor(100, 116, 139)

def add_heading_1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(14)
    run.font.bold = True
    run.font.color.rgb = RGBColor(30, 58, 138)

def add_heading_2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(11.5)
    run.font.bold = True
    run.font.color.rgb = RGBColor(79, 70, 229)

def add_paragraph(doc, text, bold_prefix=None, italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Arial'
        r_pre.font.size = Pt(10)
        r_pre.font.bold = True
        r_pre.font.color.rgb = RGBColor(30, 41, 59)
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(10)
    run.font.italic = italic
    run.font.color.rgb = RGBColor(51, 65, 85)
    return p

def add_callout(doc, text, title="LƯU Ý TRỌNG TÂM"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    tbl.columns[0].width = Inches(6.8)
    cell = tbl.cell(0, 0)
    set_cell_background(cell, "F1F5F9")
    set_cell_margins(cell, top=140, bottom=140, left=200, right=180)
    
    # Left blue border
    borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:left w:val="single" w:sz="24" w:space="0" w:color="4F46E5"/><w:top w:val="none"/><w:right w:val="none"/><w:bottom w:val="none"/></w:tcBorders>')
    cell._tc.get_or_add_tcPr().append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(2)
    r_title = p.add_run(f"★ {title}: ")
    r_title.font.name = 'Arial'
    r_title.font.size = Pt(9.5)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(79, 70, 229)
    
    r_text = p.add_run(text)
    r_text.font.name = 'Arial'
    r_text.font.size = Pt(9.5)
    r_text.font.color.rgb = RGBColor(30, 41, 59)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def style_table(table, col_widths, alignments):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    # Header row styling
    header_row = table.rows[0]
    for j, cell in enumerate(header_row.cells):
        cell.width = Inches(col_widths[j])
        set_cell_background(cell, "1E3A8A") # Dark Navy
        set_cell_margins(cell, top=120, bottom=120, left=140, right=140)
        p = cell.paragraphs[0]
        p.alignment = alignments[j]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        for r in p.runs:
            r.font.name = 'Arial'
            r.font.size = Pt(9)
            r.font.bold = True
            r.font.color.rgb = RGBColor(255, 255, 255)
            
    # Body rows styling
    for i, row in enumerate(table.rows[1:]):
        fill_color = "F8FAFC" if i % 2 == 0 else "FFFFFF"
        for j, cell in enumerate(row.cells):
            cell.width = Inches(col_widths[j])
            set_cell_background(cell, fill_color)
            set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
            cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
            p = cell.paragraphs[0]
            p.alignment = alignments[j]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.15
            for r in p.runs:
                r.font.name = 'Arial'
                r.font.size = Pt(8.5)
                r.font.color.rgb = RGBColor(30, 41, 59)

def build_research_docx(output_path):
    doc = docx.Document()
    add_header_footer(doc, "Báo Cáo Nghiên Cứu Khoa Học")
    add_title(
        doc,
        "BÁO CÁO NGHIÊN CỨU KHOA HỌC:\nTHUYẾT 4 KHÍ CHẤT & MÔ HÌNH PHONG CÁCH XÃ HỘI",
        "Cơ Sở Tâm Lý Học Hàn Lâm & 4 Đề Xuất Gia Tăng Độ Sâu Đánh Giá",
        "28/08/2026"
    )
    
    # 1. Executive Summary
    add_heading_1(doc, "1. TỔNG QUAN NGHIÊN CỨU (EXECUTIVE SUMMARY)")
    add_paragraph(doc, "Bản câu hỏi trắc nghiệm 40 câu (20 Điểm mạnh + 20 Điểm yếu) đang sử dụng trong dự án là bản chuẩn hóa kinh điển từ công trình 'Personality Plus' của Florence Littauer (1983), phát triển trên nền tảng Thuyết 4 Khí Chất (Four Temperaments) của Hippocrates & Galen, đồng thời ánh xạ trực tiếp sang Mô hình 2 Trục Cường Độ × Tốc Độ của Wilhelm Wundt (1879), Học thuyết Thần kinh Cấp cao của Ivan Pavlov (1904), và Mô hình Phong cách Xã hội (Social Styles Matrix) của Merrill & Reid (1981).")
    add_paragraph(doc, "Báo cáo này tổng hợp cơ sở khoa học hàn lâm và đưa ra 4 đề xuất chiến lược nhằm nâng tầm ứng dụng từ việc chỉ phân loại phong cách đơn thuần sang đánh giá năng lực thích ứng (Versatility) và quản trị căng thẳng (Backup Behaviors).")
    
    add_callout(doc, "Nghiên cứu của TRACOM Group & Wilson Learning chứng minh: Nhận thức về phong cách của mình (Self-awareness) chỉ chiếm 30% thành công giao tiếp. 70% hiệu suất lãnh đạo, đàm phán và giải quyết xung đột phụ thuộc vào Chỉ số Linh hoạt (Versatility / Style Flexing) — khả năng nhận diện phong cách đối phương và tự điều chỉnh hành vi cho phù hợp.", "PHÁT HIỆN THỰC CHỨNG QUAN TRỌNG")

    # 2. Historical & Academic Foundations
    add_heading_1(doc, "2. TIẾN TRÌNH PHÁT TRIỂN LỊCH SỬ & CƠ SỞ TÂM LÝ HỌC HÀN LÂM")
    add_paragraph(doc, "1. Hippocrates (~460 – 370 TCN) & Claudius Galen (~129 – 216 SCN): Khởi xướng Thuyết 4 Thể dịch (Máu, Mật vàng, Mật đen, Đờm nhầy) tương ứng 4 nguyên tố tự nhiên (Không khí, Lửa, Đất, Nước) và chuẩn hóa thành 4 kiểu khí chất cơ bản.", "• Cội nguồn Hy Lạp - La Mã: ")
    add_paragraph(doc, "2. Wilhelm Wundt (1879): Cha đẻ tâm lý học thực nghiệm, người đầu tiên chuyển hóa 4 khí chất thể dịch cổ đại thành hệ tọa độ 2 trục: Cường độ cảm xúc (Mạnh vs. Yếu) và Tốc độ biến đổi (Nhanh vs. Chậm).", "• Chuyển đổi thực nghiệm: ")
    add_paragraph(doc, "3. Ivan Pavlov (1904 - Giải Nobel Y học): Chứng minh cơ sở sinh lý học thần kinh của 4 khí chất dựa trên 3 thuộc tính của vỏ não: Cường lực (Mạnh/Yếu), Độ cân bằng (Cân bằng/Lệch) và Độ linh hoạt (Nhanh/Chậm).", "• Cơ sở sinh lý học thần kinh: ")
    add_paragraph(doc, "4. William Moulton Marston (1928) & David Merrill & Roger Reid (1981): Ứng dụng vào quản trị và hành vi tổ chức, hình thành mô hình DISC (D-I-S-C) và Ma trận Phong cách Xã hội (Driver, Expressive, Analytical, Amiable).", "• Ứng dụng hành vi tổ chức: ")
    add_paragraph(doc, "5. Florence Littauer (1983 - 'Personality Plus'): Chuẩn hóa bộ 40 dòng từ vựng trắc nghiệm (20 Điểm mạnh + 20 Điểm yếu) — chính là nguồn gốc dữ liệu của bài khảo sát hiện tại.", "• Chuẩn hóa trắc nghiệm hiện đại: ")

    # 3. 2-Axis Matrix Wundt & Pavlov
    add_heading_1(doc, "3. MA TRẬN 2 TRỤC: CƯỜNG ĐỘ CẢM XÚC × TỐC ĐỘ PHẢN ỨNG")
    add_paragraph(doc, "Sự kết hợp giữa 2 trục Cường độ và Tốc độ phản ứng định hình nên 4 khí chất với các đặc tính sinh lý thần kinh và hành vi đặc thù:")
    
    # Table of 4 temperaments
    table_temp = doc.add_table(rows=5, cols=6)
    headers_temp = ["Khí Chất (VN)", "Gốc Hy Lạp", "Loài Chim", "Cường Độ", "Tốc Độ", "Đặc Điểm Nhận Diện Cốt Lõi"]
    for j, h in enumerate(headers_temp):
        table_temp.cell(0, j).paragraphs[0].add_run(h)
        
    temp_data = [
        ["Khí chất NÓNG NẢY", "Choleric (Mật vàng)", "Đại Bàng (Driver)", "MẠNH", "NHANH", "Quyết liệt, nóng tính, bộc phát tức thì, thiên hướng chỉ huy, không chấp nhận thất bại."],
        ["Khí chất LINH HOẠT", "Sanguine (Đa huyết)", "Chim Công (Expressive)", "VỪA / YẾU", "RẤT NHANH", "Hoạt bát, vui tươi, dễ thích nghi, cảm xúc mau đến mau đi, kết nối rộng, truyền cảm hứng."],
        ["Khí chất ƯU TƯ", "Melancholic (Mật đen)", "Chim Cú (Analytical)", "MẠNH / SÂU", "CHẬM", "Trầm lặng, sâu sắc, ngẫm nghĩ lâu, cảm xúc ngấm sâu, tỉ mỉ, cầu toàn, dễ tổn thương."],
        ["Khí chất BÌNH THẢN", "Phlegmatic (Đờm nhầy)", "Bồ Câu (Amiable)", "ĐIỀM ĐẠM", "CHẬM", "Bình thản, kiên nhẫn, phẳng lặng trước biến động, lắng nghe tốt, ngại thay đổi và xung đột."]
    ]
    for i, row in enumerate(temp_data):
        for j, val in enumerate(row):
            table_temp.cell(i+1, j).paragraphs[0].add_run(val)
            
    style_table(table_temp, [1.3, 1.1, 1.2, 0.7, 0.7, 1.8], [WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT])

    # 4. Polar Opposites
    add_heading_1(doc, "4. BẢN CHẤT CÁC CẶP ĐỐI NGHỊCH TRONG MA TRẬN KHÍ CHẤT")
    add_heading_2(doc, "A. Hai Cặp Đối Nghịch Toàn Phần Cả 2 Trục (Diagonal Polar Opposites)")
    add_paragraph(doc, "1. NÓNG NẢY (Đại Bàng) ⚔️ BÌNH THẢN (Bồ Câu): Đối lập toàn phần trên cả 2 chiều đo — Cực mạnh & Cực nhanh (Nóng nảy) ⚔️ Cực phẳng & Cực chậm (Bình thản).")
    add_paragraph(doc, "2. LINH HOẠT (Chim Công) ⚔️ ƯU TƯ (Chim Cú): Đối lập toàn phần trên cả 2 chiều đo — Lạc quan, hướng ngoại, nông & nhanh (Linh hoạt) ⚔️ Bi quan, hướng nội, sâu sắc & chậm (Ưu tư).")
    
    add_heading_2(doc, "B. Cặp Đối Nghịch Về Hướng Bộc Lộ Hành Vi (Ngoại Hiện vs. Nội Tâm Hóa)")
    add_paragraph(doc, "• NÓNG NẢY (Đại Bàng) ⚔️ ƯU TƯ (Chim Cú): Cả hai đều thuộc nhóm Cường độ cảm xúc rất mạnh (dễ bị cảm xúc chi phối nặng nề). Tuy nhiên, Nóng nảy bộc phát ra ngoài thành cơn giận dữ, áp đặt quyền lực; trong khi Ưu tư dồn nén vào trong thành sự dằn vặt, lo âu, thu mình vào vỏ ốc.")

    # 5. Cross-Taxonomy Mapping Table
    add_heading_1(doc, "5. BẢNG ĐỐI CHIẾU TIẾN HÓA ĐA HỆ THỐNG (CROSS-TAXONOMY)")
    table_cross = doc.add_table(rows=7, cols=5)
    headers_cross = ["Hệ Thống Phân Loại", "Nhóm 1 (Công)", "Nhóm 2 (Đại Bàng)", "Nhóm 3 (Cú)", "Nhóm 4 (Bồ Câu)"]
    for j, h in enumerate(headers_cross):
        table_cross.cell(0, j).paragraphs[0].add_run(h)
        
    cross_data = [
        ["Tâm lý học Việt Nam", "Khí chất LINH HOẠT", "Khí chất NÓNG NẢY", "Khí chất ƯU TƯ", "Khí chất BÌNH THẢN"],
        ["Hippocrates & Galen", "Sanguine (Máu / Khí)", "Choleric (Mật vàng / Lửa)", "Melancholic (Mật đen / Đất)", "Phlegmatic (Đờm / Nước)"],
        ["Wilhelm Wundt (1879)", "Cường độ vừa + Nhanh", "Cường độ mạnh + Nhanh", "Cường độ mạnh + Chậm", "Cường độ yếu + Chậm"],
        ["Mô hình DISC (1928)", "I (Influence - Vàng)", "D (Dominance - Đỏ)", "C (Conscientiousness - Xanh)", "S (Steadiness - Lá)"],
        ["Social Styles (1981)", "Expressive (Ưa Thể Hiện)", "Driver (Ưa Chỉ Đạo)", "Analytical (Ưa Phân Tích)", "Amiable (Dễ Chịu)"],
        ["Personality Plus (1983)", "Sanguine Tỏa Sáng", "Choleric Quyết Đoán", "Melancholy Hoàn Hảo", "Phlegmatic Điềm Đạm"]
    ]
    for i, row in enumerate(cross_data):
        for j, val in enumerate(row):
            table_cross.cell(i+1, j).paragraphs[0].add_run(val)
            
    style_table(table_cross, [1.6, 1.3, 1.3, 1.3, 1.3], [WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER])

    # 6. Backup Behaviors
    add_heading_1(doc, "6. HÀNH VI DỰ PHÒNG DƯỚI ÁP LỰC CAO (BACKUP BEHAVIORS)")
    add_paragraph(doc, "Khi mức độ căng thẳng tương tác (Interpersonal Tension) tăng cao, não bộ kích hoạt cơ chế phòng vệ tiêu cực (Toxic Drift / Backup Behavior):")
    add_paragraph(doc, "1. 🦅 Khí chất Nóng nảy (Đại Bàng): Rơi vào trạng thái AUTOCRATIC (Độc đoán, ép buộc bằng quyền hạn, coi thường ý kiến người khác).")
    add_paragraph(doc, "2. 🦚 Khí chất Linh hoạt (Chim Công): Rơi vào trạng thái ATTACKING (Công kích, đổ lỗi, bộc phát cảm xúc dữ dội, đóng vai nạn nhân).")
    add_paragraph(doc, "3. 🕊️ Khí chất Bình thản (Bồ Câu): Rơi vào trạng thái ACQUIESCING (Nhượng bộ giả tạo bên ngoài nhưng rút lui ngầm, trì hoãn thụ động).")
    add_paragraph(doc, "4. 🦉 Khí chất Ưu tư (Chim Cú): Rơi vào trạng thái AVOIDING (Tránh né, đóng băng giao tiếp, thu mình vào dữ liệu và quy trình).")

    # 7. Strategic Enhancement Recommendations
    add_heading_1(doc, "7. 4 ĐỀ XUẤT CHIẾN LƯỢC GIA TĂNG ĐỘ SÂU ĐÁNH GIÁ")
    add_paragraph(doc, "1. Đồ Thị Tọa Độ Hành Vi 2D (2D Cartesian Scatter Matrix): Tính toán tọa độ (X, Y) để xác định vị trí chính xác của cá nhân trên ma trận 4 góc phần tư (Định hướng Công việc vs. Con người và Quyết đoán Ask vs. Tell).", "• Đề Xuất 1: ")
    add_paragraph(doc, "2. Đánh Giá 'Phản Xạ Căng Thẳng & Điểm Mù' (Stress Trigger & Backup Behaviors): Nhận diện yếu tố gây kích hoạt stress và cung cấp Lộ trình 3 bước hạ nhiệt cảm xúc (De-escalation Roadmap).", "• Đề Xuất 2: ")
    add_paragraph(doc, "3. Đo Lường Chỉ Số Linh Hoạt Thích Ứng (Versatility Index): Bổ sung 5-6 câu hỏi tình huống thực tế để đánh giá năng lực thích ứng hành vi (Style Flexing Playbook).", "• Đề Xuất 3: ")
    add_paragraph(doc, "4. Ma Trận Khắc Chế & Kịch Bản Giao Tiếp Mẫu (Pairwise Synergy Protocols): Hướng dẫn giải quyết xung đột cho 2 cặp đối lập (Đại Bàng - Bồ Câu & Chim Công - Chim Cú) kèm kịch bản giao việc, họp nhóm và đàm phán.", "• Đề Xuất 4: ")

    doc.save(output_path)
    print(f"Created DOCX: {output_path}")

def convert_docx_to_pdf(docx_path, pdf_path):
    import win32com.client
    word = None
    try:
        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        word.DisplayAlerts = False
        doc = word.Documents.Open(os.path.abspath(docx_path))
        doc.ExportAsFixedFormat(
            os.path.abspath(pdf_path),
            17, # wdExportFormatPDF
            OpenAfterExport=False,
            OptimizeFor=0, # wdExportOptimizeForPrint
            CreateBookmarks=1
        )
        doc.Close(False)
        print(f"Converted to PDF: {pdf_path}")
        return True
    except Exception as e:
        print(f"Error converting to PDF via Word: {e}")
        return False
    finally:
        if word:
            try:
                word.Quit()
            except:
                pass

if __name__ == "__main__":
    base_dir = r"C:\Users\vu.hoang\.gemini\antigravity\scratch\Research"
    docx_file = os.path.join(base_dir, "BAO_CAO_NGHIEN_CUU_KHOA_HOC_THUYET_4_KHI_CHAT_VA_SOCIAL_STYLES.docx")
    pdf_file = os.path.join(base_dir, "BAO_CAO_NGHIEN_CUU_KHOA_HOC_THUYET_4_KHI_CHAT_VA_SOCIAL_STYLES.pdf")
    
    print("Generating DOCX research report...")
    build_research_docx(docx_file)
    
    print("Converting DOCX to PDF...")
    success = convert_docx_to_pdf(docx_file, pdf_file)
    if success:
        print(f"PDF successfully generated at: {pdf_file}")
    else:
        print("PDF conversion failed.")
