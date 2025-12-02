import { useEffect } from "react";

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PRIVACY POLICY</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated December 1, 2025</p>

          <div className="text-gray-600 space-y-6">
            <p>
              This Privacy Notice for <strong>STANS LLC</strong> (doing business as <strong>Stans</strong>)
              ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share
              ("process") your personal information when you use our services ("Services"), including when you:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Download and use our mobile application (Stans) or any other application of ours that links to this Privacy Notice</li>
              <li>Use Stans, a platform that allows you to discover events, find local deals from merchants near events, purchase vouchers, and connect with other attendees</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>

            <p>
              <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices.
              We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies
              and practices, please do not use our Services. If you still have any questions or concerns, please contact us at{" "}
              <a href="mailto:info@stans.app" className="text-blue-600 hover:underline">info@stans.app</a>.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">SUMMARY OF KEY POINTS</h2>
            <p className="italic">
              This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics
              by reading the full notice below.
            </p>

            <p>
              <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process
              personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.
            </p>

            <p>
              <strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.
            </p>

            <p>
              <strong>Do we collect any information from third parties?</strong> We may collect information from public databases,
              marketing partners, Ticketmaster (for event data), and Stripe (for payment processing).
            </p>

            <p>
              <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services,
              communicate with you, for security and fraud prevention, to process payments for deal purchases, and to comply with law.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">TABLE OF CONTENTS</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li><a href="#infocollect" className="text-blue-600 hover:underline">WHAT INFORMATION DO WE COLLECT?</a></li>
              <li><a href="#infouse" className="text-blue-600 hover:underline">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
              <li><a href="#whoshare" className="text-blue-600 hover:underline">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
              <li><a href="#inforetain" className="text-blue-600 hover:underline">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
              <li><a href="#infominors" className="text-blue-600 hover:underline">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
              <li><a href="#privacyrights" className="text-blue-600 hover:underline">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
              <li><a href="#DNT" className="text-blue-600 hover:underline">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
              <li><a href="#uslaws" className="text-blue-600 hover:underline">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
              <li><a href="#policyupdates" className="text-blue-600 hover:underline">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
              <li><a href="#contact" className="text-blue-600 hover:underline">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
              <li><a href="#request" className="text-blue-600 hover:underline">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
            </ol>

            <h2 id="infocollect" className="text-xl font-semibold text-gray-900 mt-8">1. WHAT INFORMATION DO WE COLLECT?</h2>

            <h3 className="text-lg font-medium text-gray-900 mt-4">Personal information you disclose to us</h3>
            <p className="italic">
              <strong>In Short:</strong> We collect personal information that you provide to us.
            </p>
            <p>
              We collect personal information that you voluntarily provide to us when you register on the Services,
              express an interest in obtaining information about us or our products and Services, when you participate
              in activities on the Services, or otherwise when you contact us.
            </p>

            <p><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Names</li>
              <li>Email addresses</li>
              <li>Phone numbers</li>
              <li>Usernames</li>
              <li>Passwords</li>
            </ul>

            <p><strong>Payment Information.</strong> We use Stripe for payment processing. We do not store your complete credit card information. Stripe collects:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Credit card number, expiration date, CVV</li>
              <li>Billing address</li>
              <li>Payment history</li>
            </ul>
            <p>
              For more information on how Stripe handles your data, please review{" "}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Stripe's Privacy Policy</a>.
            </p>

            <p><strong>Sensitive Information.</strong> We do not process sensitive information.</p>

            <p><strong>Application Data.</strong> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><em>Geolocation Data.</em> We may request access or permission to track location-based information from your mobile device to provide location-based services. If you wish to change our access or permissions, you may do so in your device's settings.</li>
              <li><em>Mobile Device Access.</em> We may request access or permission to certain features from your mobile device, including your mobile device's camera and photo library. If you wish to change our access or permissions, you may do so in your device's settings.</li>
              <li><em>Mobile Device Data.</em> We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server).</li>
            </ul>
            <p>This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-4">Information automatically collected</h3>
            <p className="italic">
              <strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
            </p>
            <p>
              We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.
            </p>
            <p>The information we collect includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files.</li>
              <li><em>Device Data.</em> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services.</li>
            </ul>

            <h2 id="infouse" className="text-xl font-semibold text-gray-900 mt-8">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
            <p className="italic">
              <strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
            </p>
            <p><strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
              <li><strong>To process payments and deliver services.</strong> We process your payment information through Stripe to complete deal purchases and deliver digital vouchers.</li>
              <li><strong>To deliver location-based services.</strong> We may process your location data to show you nearby events and merchant deals.</li>
              <li><strong>To enable user-to-user communications.</strong> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
              <li><strong>To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences.</li>
            </ul>

            <h2 id="whoshare" className="text-xl font-semibold text-gray-900 mt-8">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
            <p className="italic">
              <strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.
            </p>
            <p>We may need to share your personal information in the following situations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Payment Processing.</strong> We share payment information with Stripe to process transactions securely.</li>
              <li><strong>Merchants.</strong> When you purchase a deal, we share your name, purchase details, and redemption status with the merchant.</li>
              <li><strong>Event Data Providers.</strong> We use Ticketmaster API to provide event information.</li>
              <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            </ul>

            <h2 id="inforetain" className="text-xl font-semibold text-gray-900 mt-8">4. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
            <p className="italic">
              <strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.
            </p>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law. No purpose in this notice will require us keeping your personal information for longer than three (3) months past the termination of the user's account.
            </p>
            <p>
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
            </p>

            <h2 id="infominors" className="text-xl font-semibold text-gray-900 mt-8">5. DO WE COLLECT INFORMATION FROM MINORS?</h2>
            <p className="italic">
              <strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.
            </p>
            <p>
              We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at{" "}
              <a href="mailto:info@stans.app" className="text-blue-600 hover:underline">info@stans.app</a>.
            </p>

            <h2 id="privacyrights" className="text-xl font-semibold text-gray-900 mt-8">6. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
            <p className="italic">
              <strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
            </p>
            <p>
              In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making.
            </p>

            <h2 id="DNT" className="text-xl font-semibold text-gray-900 mt-8">7. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
            <p>
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
            </p>

            <h2 id="uslaws" className="text-xl font-semibold text-gray-900 mt-8">8. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
            <p className="italic">
              <strong>In Short:</strong> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Montana, New Hampshire, New Jersey, Oregon, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information.
            </p>

            <h2 id="policyupdates" className="text-xl font-semibold text-gray-900 mt-8">9. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
            <p className="italic">
              <strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.
            </p>
            <p>
              We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
            </p>

            <h2 id="contact" className="text-xl font-semibold text-gray-900 mt-8">10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
            <p>
              If you have questions or comments about this notice, you may email us at{" "}
              <a href="mailto:info@stans.app" className="text-blue-600 hover:underline">info@stans.app</a> or contact us by post at:
            </p>
            <address className="not-italic mt-4">
              <strong>STANS LLC</strong><br />
              2916 Fairland Road<br />
              Silver Spring, MD 20904<br />
              United States
            </address>

            <h2 id="request" className="text-xl font-semibold text-gray-900 mt-8">11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
            <p>
              Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. To request to review, update, or delete your personal information, please visit{" "}
              <a href="https://stans.app" className="text-blue-600 hover:underline">stans.app</a> or email us at{" "}
              <a href="mailto:info@stans.app" className="text-blue-600 hover:underline">info@stans.app</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
