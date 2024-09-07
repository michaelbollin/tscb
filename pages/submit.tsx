import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from '../components/container';
import Layout from '../components/layout';
import { CMS_NAME } from '../lib/constants';

export default function Submit({ preview }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    image: '',
    author: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://api.tinyshinycookbook.com/wp-json/wp/v2/submit-dish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        router.push('/thank-you');
      } else {
        setError('An error occurred while submitting the dish. Please try again.');
      }
    } catch (err) {
      setError(
        'An error occurred while submitting the dish. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Submit a Dish | ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <h1 className="text-4xl md:text-6xl lg:text-6xl mb-10 font-playfair font-normal bg-gradient-to-r from-gray-200 to-black text-transparent bg-clip-text text-center md:text-left">
          Submit a Dish
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Submit your dish to the Tiny Shiny Cookbook. If it's a hit, we'll feature it on the homepage feed and our Instagram page. Submission is free and easy.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Dish Name
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="mt-1 block w-full rounded-md mborder-gray-600 border p-3 bg-transparent md:max-w-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-300"
            >
              Dish URL - where should we redirect to?
            </label>
            <input
              type="url"
              name="url"
              id="url"
              required
              className="mt-1 block w-full rounded-md mborder-gray-600 border p-3 bg-transparent md:max-w-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.url}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-300"
            >
              Image URL
            </label>
            <input
              type="url"
              name="image"
              id="image"
              required
              className="mt-1 block w-full rounded-md mborder-gray-600 border p-3 bg-transparent md:max-w-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-300"
            >
              Chef Name - dish will be attributed to this username
            </label>
            <input
              type="text"
              name="author"
              id="author"
              required
              className="mt-1 block w-full rounded-md mborder-gray-600 border p-3 bg-transparent md:max-w-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-300"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              required
              className="mt-1 block w-full rounded-md mborder-gray-600 border p-3 bg-transparent md:max-w-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Dish'}
          </button>
        </form>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview },
  };
}
