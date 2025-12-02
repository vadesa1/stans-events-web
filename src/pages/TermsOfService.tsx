import { useEffect } from "react";
import { Link } from "react-router-dom";

export function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TERMS OF SERVICE</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated December 1, 2025</p>

          <div className="text-gray-600 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">AGREEMENT TO TERMS</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf
              of an entity ("you") and <strong>STANS LLC</strong> (doing business as <strong>Stans</strong>) ("we," "us," or "our"),
              concerning your access to and use of the Stans mobile application and website as well as any other media form,
              media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Services").
            </p>
            <p>
              You agree that by accessing the Services, you have read, understood, and agree to be bound by all of these Terms of Service.
              IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU
              MUST DISCONTINUE USE IMMEDIATELY.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">OUR SERVICES</h2>
            <p>
              Stans is a platform that connects event-goers with pre-event dining and entertainment deals from nearby merchants
              (restaurants, bars, sports bars). Our Services include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Event discovery powered by Ticketmaster and custom merchant events</li>
              <li>AI-powered ticket search and recommendations</li>
              <li>Pre-event deals and vouchers from local merchants near event venues</li>
              <li>Digital voucher purchase and redemption</li>
              <li>Location-based merchant and deal discovery</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">USER REGISTRATION</h2>
            <p>
              You may be required to register with the Services. You agree to keep your password confidential and will be responsible
              for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we
              determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">PURCHASES AND PAYMENT</h2>
            <p>We accept the following forms of payment:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Visa</li>
              <li>Mastercard</li>
              <li>American Express</li>
              <li>Discover</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
            </ul>
            <p>
              You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services.
              You further agree to promptly update account and payment information, including email address, payment method, and payment
              card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the
              price of purchases as deemed required by us. We may change prices at any time. All payments shall be in U.S. dollars.
            </p>
            <p>
              You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you
              authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right
              to correct any errors or mistakes in pricing, even if we have already requested or received payment.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">DEAL VOUCHERS AND REDEMPTION</h2>
            <p>
              When you purchase a deal through the Services, you will receive a digital voucher with a unique voucher code.
              To redeem your voucher:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Present your voucher code at the participating merchant</li>
              <li>Vouchers must be redeemed within the validity period specified at purchase</li>
              <li>Vouchers are non-transferable and cannot be exchanged for cash</li>
              <li>Each voucher can only be redeemed once</li>
              <li>Merchants may require verification via PIN code provided through the app</li>
            </ul>
            <p>
              We are not responsible for any issues arising from merchant's inability to honor the deal, merchant closure,
              or changes to the deal terms by the merchant. In such cases, we will work with you to provide a refund or credit.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">AI TICKET FINDER SUBSCRIPTION</h2>
            <p>
              Our AI Ticket Finder feature offers the following options:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier:</strong> 2 free AI ticket searches per month</li>
              <li><strong>Single Search:</strong> $1.99 per individual search</li>
              <li><strong>Monthly Unlimited:</strong> $4.99 per month for unlimited searches</li>
            </ul>
            <p>
              Subscription purchases are processed through Apple's App Store (iOS) or Google Play Store (Android).
              Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.
              You can manage your subscription in your device's app store settings.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">REFUNDS POLICY</h2>
            <p>
              All sales are final and no refund will be issued except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The merchant is unable to honor the deal due to closure or other reasons beyond your control</li>
              <li>Technical errors prevented you from redeeming a valid voucher</li>
              <li>The event associated with your deal was cancelled</li>
            </ul>
            <p>
              Refund requests must be submitted within 30 days of purchase. To request a refund, please contact us at{" "}
              <a href="mailto:info@stans.app" className="text-blue-600 hover:underline">info@stans.app</a>.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">PROHIBITED ACTIVITIES</h2>
            <p>
              You may not access or use the Services for any purpose other than that for which we make the Services available.
              The Services may not be used in connection with any commercial endeavors except those that are specifically
              endorsed or approved by us. As a user of the Services, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Systematically retrieve data or other content from the Services to create a collection or database</li>
              <li>Trick, defraud, or mislead us or other users, especially in any attempt to learn sensitive account information</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Services</li>
              <li>Use the Services in a manner inconsistent with any applicable laws or regulations</li>
              <li>Use any automated system to access the Services in a manner that sends more request messages than a human can reasonably produce</li>
              <li>Use the Services to advertise or offer to sell goods and services</li>
              <li>Attempt to impersonate another user or person</li>
              <li>Create multiple accounts to abuse free tier benefits or circumvent restrictions</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">USER GENERATED CONTENT</h2>
            <p>
              The Services may invite you to participate in forums, post reviews, or share content. By posting content,
              you grant us the right to use, reproduce, modify, and distribute such content. You represent and warrant that
              you own or control all rights to the content you post and that such content does not violate any laws or
              infringe the rights of any third party.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">MOBILE APPLICATION LICENSE</h2>
            <p>
              If you access the Services via a mobile application, then we grant you a revocable, non-exclusive,
              non-transferable, limited right to install and use the mobile application on wireless electronic devices
              owned or controlled by you, and to access and use the mobile application on such devices strictly in
              accordance with the terms and conditions of this mobile application license contained in these Terms of Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">THIRD-PARTY SERVICES</h2>
            <p>
              The Services may contain links to third-party websites and services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Ticketmaster:</strong> Event information and ticket purchasing</li>
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>Apple Maps / Google Maps:</strong> Location and navigation services</li>
            </ul>
            <p>
              We are not responsible for the content, accuracy, or practices of any third-party websites or services.
              Inclusion of any linked website does not imply endorsement or approval by us.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">SERVICES MANAGEMENT</h2>
            <p>We reserve the right, but not the obligation, to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Monitor the Services for violations of these Terms of Service</li>
              <li>Take appropriate legal action against anyone who violates the law or these Terms</li>
              <li>Refuse, restrict access to, limit availability of, or disable any of your contributions</li>
              <li>Remove or disable all files and content that are excessive in size or burdensome to our systems</li>
              <li>Otherwise manage the Services in a manner designed to protect our rights and property</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">TERM AND TERMINATION</h2>
            <p>
              These Terms of Service shall remain in full force and effect while you use the Services. WITHOUT LIMITING
              ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
              NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO
              ANY PERSON FOR ANY REASON OR FOR NO REASON.
            </p>
            <p>
              If we terminate or suspend your account for any reason, you are prohibited from registering and creating
              a new account under your name, a fake or borrowed name, or the name of any third party.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">MODIFICATIONS AND INTERRUPTIONS</h2>
            <p>
              We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason
              at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the
              Services without notice at any time. We will not be liable to you or any third party for any modification,
              price change, suspension, or discontinuance of the Services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">GOVERNING LAW</h2>
            <p>
              These Terms shall be governed by and defined following the laws of the State of Maryland, United States.
              STANS LLC and yourself irrevocably consent that the courts of Maryland shall have exclusive jurisdiction
              to resolve any dispute which may arise in connection with these Terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">DISPUTE RESOLUTION</h2>
            <p>
              <strong>Informal Negotiations:</strong> To expedite resolution and control the cost of any dispute, controversy,
              or claim related to these Terms of Service, the parties agree to first attempt to negotiate any dispute
              informally for at least thirty (30) days before initiating arbitration.
            </p>
            <p>
              <strong>Binding Arbitration:</strong> Any dispute arising out of or in connection with these Terms shall be
              referred to and finally resolved by binding arbitration under the rules of the American Arbitration Association.
              The arbitration shall be conducted in Silver Spring, Maryland, unless otherwise agreed by the parties.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">LIMITATION OF LIABILITY</h2>
            <p>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
              INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE,
              LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">INDEMNIFICATION</h2>
            <p>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our
              respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim,
              or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out
              of your use of the Services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">CONTACT US</h2>
            <p>
              In order to resolve a complaint regarding the Services or to receive further information regarding use of
              the Services, please contact us at:
            </p>
            <address className="not-italic mt-4">
              <strong>STANS LLC</strong><br />
              2916 Fairland Road<br />
              Silver Spring, MD 20904<br />
              United States<br /><br />
              Email: <a href="mailto:info@stans.app" className="text-blue-600 hover:underline">info@stans.app</a>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
