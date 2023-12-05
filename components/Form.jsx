import Link from "next/link";

const Form = ({type,post,setPost,submitting,handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
        </h1>
        <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world, and help others get inspired.
        </p>

        <form className="w-full max-w-2xl flex flex-col gap-7 glassmorphism mt-10" onSubmit={handleSubmit}>
         <label className="text-left">
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea
            className="form_textarea"
            placeholder="Write your prompt here..."
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            required
          />
          </label>

          <label className="text-left">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {' '}
            <span className="font_normal">
              (#product, #webdev, #innovation)
            </span>
            </span>
          <input
            className="form_input"
            placeholder="#tag"
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
            required
          />
          </label>

          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="text-sm text-white bg-primary-orange py-2.5 px-5 rounded-full"
            >
              {submitting ? '${type}...' : type}
            </button>
          </div>
        </form>
    </section>
  )
}

export default Form