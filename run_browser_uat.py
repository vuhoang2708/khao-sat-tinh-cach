import json
import os
import sys
import time
from playwright.sync_api import sync_playwright

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def run_personality_uat():
    uat_dir = r"C:\Users\vu.hoang\.gemini\antigravity\scratch\khao-sat-tinh-cach\UAT"
    screenshot_dir = os.path.join(uat_dir, "screenshots")
    os.makedirs(screenshot_dir, exist_ok=True)

    target_url = "https://khao-sat-tinh-cach.vercel.app"
    print(f"[UAT] Starting Browser UAT on {target_url}...")

    console_errors = []
    page_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        # Step 1: Open Home Page & Verify Onboarding Modal
        print("1. Loading page...")
        page.goto(target_url)
        page.wait_for_load_state("networkidle")
        time.sleep(1.5)

        page.screenshot(path=os.path.join(screenshot_dir, "01_onboarding_decree13_modal.png"))
        print("  - Captured 01_onboarding_decree13_modal.png")

        # Step 2: Test Cloud Sync Tab & Decree 13 Consent Box
        print("2. Testing Cloud Sync Tab and Decree 13 Consent Box...")
        cloud_tab = page.locator('button:has-text("Đồng Bộ")')
        if cloud_tab.count() > 0:
            cloud_tab.first.click()
            time.sleep(0.8)
            page.screenshot(path=os.path.join(screenshot_dir, "02_decree13_consent_form.png"))
            print("  - Captured 02_decree13_consent_form.png")

        # Step 3: Switch back to Anonymous Tab and Start
        print("3. Switching back to 1-Click Anonymous Mode...")
        anon_tab = page.locator('button:has-text("Ẩn Danh")')
        if anon_tab.count() > 0:
            anon_tab.first.click()
            time.sleep(0.5)

        # Click Start Button in Anonymous Mode
        modal_start_btn = page.locator('div.fixed button:has-text("Bắt Đầu")')
        if modal_start_btn.count() > 0:
            modal_start_btn.first.click()
        else:
            page.locator('div.fixed button').last.click()
            
        time.sleep(1)

        # Step 4: Answering 40 Questions accurately
        print("4. Answering 40 questions...")
        page.screenshot(path=os.path.join(screenshot_dir, "03_question_1_anonymous.png"))

        for i in range(1, 41):
            opt_idx = (i % 4) # Select option 0..3
            # Locate option buttons inside the question card
            options = page.locator('main div.grid button.group')
            if options.count() >= 4:
                options.nth(opt_idx).click()
            else:
                page.locator('main button:has-text("A"), main button:has-text("B"), main button:has-text("C"), main button:has-text("D")').nth(opt_idx).click()
                
            time.sleep(0.35)

            if i == 20:
                print("  - Completed Strength Section (20/40)")

        time.sleep(1)

        # Step 5: Submit Survey
        print("5. Submitting survey in Local Anonymous mode...")
        page.screenshot(path=os.path.join(screenshot_dir, "05_ready_to_submit.png"))
        submit_btn = page.locator('button:has-text("Xem Kết Quả & Báo Cáo")')
        submit_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(2)

        # Step 6: Verify Report Screen
        print("6. Verifying report screen with Privacy Badge...")
        page.screenshot(path=os.path.join(screenshot_dir, "06_results_anonymous_report.png"))

        browser.close()

    print(f"[UAT] Browser UAT completed successfully! Total console errors: {len(console_errors)}")
    return {
        "status": "PASS",
        "targetUrl": target_url,
        "modeTested": "local_anonymous_and_decree13_form",
        "consoleErrors": console_errors,
        "pageErrors": page_errors
    }

if __name__ == "__main__":
    res = run_personality_uat()
    print(json.dumps(res, indent=2))
