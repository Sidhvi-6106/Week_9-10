import { NavLink } from "react-router";
import { primaryBtn, secondaryBtn } from "../styles/common";

function Home() {
  return (
    <main className="bg-(--page-bg)">
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#0066cc]">Read, write, discuss</p>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-[#1d1d1f] sm:text-6xl">
            Blog App for authors and curious readers.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#424245]">
            Discover articles by category and author, read full posts, leave thoughtful comments, and switch into an
            author workspace when you are ready to publish your own ideas.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <NavLink to="/register?role=author" className={primaryBtn}>
              Become an Author
            </NavLink>
            <NavLink to="/login?role=author" className={secondaryBtn}>
              Login as Author
            </NavLink>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#e8e8ed] bg-[#f5f5f7]">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80"
            alt="Desk with writing tools for planning blog articles"
            className="h-90 w-full object-cover sm:h-115"
          />
        </div>
      </section>

      <section className="border-y border-[#e8e8ed] bg-[#f5f5f7]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-12 sm:px-10 md:grid-cols-3">
          {[
            ["Readers", "Open articles, browse by author name, and add comments without changing the post."],
            ["Authors", "Write, edit, update, and delete only your own published articles."],
            ["Admin","Access to Deactivate and activate the user, login, open articles"],
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg bg-white p-6">
              <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">{title}</h2>
              <p className="mt-3 leading-7 text-[#6e6e73]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 text-center sm:px-10">
        <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Want to become the author?</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6e6e73]">
          Create an author account and the registration form will select the author role for you.
        </p>
        <div className="mt-7">
          <NavLink to="/register?role=author" className={primaryBtn}>
            Start Author Signup
          </NavLink>
        </div>
      </section>
    </main>
  );
}

export default Home;
