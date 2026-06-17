const GOOGLE_FORM_URL =
  'https://forms.gle/Ak7myWxXb2YC9Md66';

const GOOGLE_FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeipBxI7h5Btl5BZFrnvJ04hB3fuSzO7gje0LS_XJlQOrFGmA/viewform?embedded=true';

export function GoogleEnquiryForm() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Course Enquiry</h1>
        <p className="text-lg text-gray-600">
          Submit your enquiry using the form below. We&apos;ll get back to you with course
          details and enrollment information.
        </p>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-blue-600 hover:underline"
        >
          Open form in a new tab
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <iframe
          src={GOOGLE_FORM_EMBED_URL}
          title="Codexa Classes Course Enquiry Form"
          width="100%"
          height={1200}
          className="w-full border-0"
          loading="lazy"
        >
          Loading form…
        </iframe>
      </div>
    </div>
  );
}
