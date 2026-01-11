export const metadata = {
  title: 'Terms of Service - JKH Fitness',
  description: 'Terms and conditions for using JKH Fitness services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: January 11, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Agreement to Terms
              </h2>
              <p className="leading-relaxed">
                Welcome to JKH Fitness. By accessing our website and using our
                services, you agree to be bound by these Terms of Service and
                all applicable laws and regulations. If you do not agree with
                any of these terms, you are prohibited from using or accessing
                our services.
              </p>
            </section>

            {/* Services Description */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Services Description
              </h2>
              <p className="leading-relaxed mb-4">
                JKH Fitness provides personal training, massage therapy, and
                injury rehabilitation services. Our services include but are not
                limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>One-on-one personal training sessions</li>
                <li>Group fitness classes</li>
                <li>Customized workout and nutrition plans</li>
                <li>Sports massage and recovery therapy</li>
                <li>Injury rehabilitation and physical therapy</li>
                <li>Online training programs and consultations</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                User Accounts
              </h2>
              <p className="leading-relaxed mb-4">
                To access certain features of our services, you must create an
                account. When creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>
                  Accept all responsibility for activities under your account
                </li>
                <li>
                  Notify us immediately of any unauthorized use of your account
                </li>
              </ul>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate your account if any
                information provided is inaccurate, not current, or incomplete.
              </p>
            </section>

            {/* Purchases and Payment */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Purchases and Payment
              </h2>
              <p className="leading-relaxed mb-4">
                All purchases made through our platform are subject to the
                following terms:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Prices are subject to change without notice</li>
                <li>Payment is required at the time of booking</li>
                <li>
                  We accept major credit cards and approved payment methods
                </li>
                <li>All sales are final unless otherwise stated</li>
                <li>
                  Package sessions expire according to the terms specified at
                  purchase
                </li>
              </ul>
              <p className="leading-relaxed">
                You agree to provide current, complete, and accurate purchase
                and account information for all purchases made through our
                services.
              </p>
            </section>

            {/* Cancellation and Refund Policy */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Cancellation and Refund Policy
              </h2>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3 mt-6">
                Session Cancellations
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Cancellations must be made at least 24 hours in advance</li>
                <li>
                  Late cancellations (less than 24 hours) will forfeit the
                  session
                </li>
                <li>No-shows will result in loss of the scheduled session</li>
                <li>
                  Emergency cancellations will be reviewed on a case-by-case
                  basis
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-black dark:text-white mb-3 mt-6">
                Package Refunds
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Unused sessions may be refunded within 30 days of purchase
                </li>
                <li>Refunds are prorated based on sessions used</li>
                <li>A 10% administrative fee applies to all refunds</li>
                <li>No refunds after 30 days from purchase date</li>
              </ul>
            </section>

            {/* Health and Safety */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Health and Safety Requirements
              </h2>
              <p className="leading-relaxed mb-4">
                By using our services, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  You are in good physical health and have no medical conditions
                  that would prevent safe participation
                </li>
                <li>
                  You have consulted with a physician before beginning any
                  exercise program
                </li>
                <li>
                  You will disclose any health conditions, injuries, or
                  medications that may affect your ability to exercise safely
                </li>
                <li>
                  You understand that physical exercise involves inherent risks
                </li>
                <li>
                  You agree to follow all safety instructions provided by
                  trainers and staff
                </li>
                <li>
                  You will immediately inform staff of any pain, discomfort, or
                  unusual symptoms
                </li>
              </ul>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-4">
                <p className="text-yellow-800 dark:text-yellow-400 font-semibold">
                  Important: If you have any pre-existing medical conditions,
                  injuries, or concerns, you must consult with your healthcare
                  provider before participating in our programs.
                </p>
              </div>
            </section>

            {/* Liability Waiver */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Liability Waiver
              </h2>
              <p className="leading-relaxed mb-4">You agree that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  JKH Fitness, its trainers, and staff are not liable for any
                  injuries sustained during training
                </li>
                <li>
                  You assume all risks associated with participation in fitness
                  activities
                </li>
                <li>
                  You release JKH Fitness from any claims, demands, or causes of
                  action arising from your participation
                </li>
                <li>
                  You are responsible for having adequate health insurance
                  coverage
                </li>
                <li>
                  Our liability is limited to the maximum extent permitted by
                  law
                </li>
              </ul>
            </section>

            {/* Code of Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Code of Conduct
              </h2>
              <p className="leading-relaxed mb-4">
                All members and visitors are expected to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Treat staff and other members with respect and courtesy</li>
                <li>
                  Maintain personal hygiene and appropriate workout attire
                </li>
                <li>Clean equipment after use</li>
                <li>Respect facility hours and scheduled sessions</li>
                <li>Refrain from disruptive or inappropriate behavior</li>
                <li>Not engage in harassment, discrimination, or bullying</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Violation of these standards may result in immediate termination
                of services without refund.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Intellectual Property Rights
              </h2>
              <p className="leading-relaxed">
                All content on our website and in our programs, including text,
                graphics, logos, images, videos, and software, is the property
                of JKH Fitness and protected by copyright and other intellectual
                property laws. You may not reproduce, distribute, modify, or
                create derivative works without our express written permission.
              </p>
            </section>

            {/* User Content */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                User-Generated Content
              </h2>
              <p className="leading-relaxed">
                If you submit any content to our platform (reviews,
                testimonials, photos, etc.), you grant JKH Fitness a worldwide,
                non-exclusive, royalty-free license to use, reproduce, and
                display such content for marketing and promotional purposes.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Termination
              </h2>
              <p className="leading-relaxed">
                We reserve the right to terminate or suspend your account and
                access to our services immediately, without prior notice or
                liability, for any reason, including but not limited to breach
                of these Terms. Upon termination, your right to use our services
                will immediately cease.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, JKH Fitness shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits or revenues, whether
                incurred directly or indirectly, or any loss of data, use,
                goodwill, or other intangible losses resulting from your use of
                our services.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Governing Law
              </h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of the jurisdiction in which JKH Fitness operates,
                without regard to its conflict of law provisions. Any disputes
                arising from these Terms shall be resolved in the courts of that
                jurisdiction.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Changes to Terms
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify or replace these Terms at any
                time. We will provide notice of any material changes by posting
                the new Terms on this page and updating the "Last Updated" date.
                Your continued use of our services after such changes
                constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Contact Information
              </h2>
              <p className="leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 transition-colors">
                <p className="mb-2">
                  <strong className="text-black dark:text-white">Email:</strong>{' '}
                  legal@jkhfitness.com
                </p>
                <p className="mb-2">
                  <strong className="text-black dark:text-white">Phone:</strong>{' '}
                  (555) 123-4567
                </p>
                <p>
                  <strong className="text-black dark:text-white">
                    Address:
                  </strong>{' '}
                  123 Fitness Street, Wellness City, WC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
