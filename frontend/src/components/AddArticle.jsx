import React from 'react';
import { useForm } from 'react-hook-form';

const AddArticle = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log("New Article for ArticleModel:", data);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-10">
      <h1 className="text-2xl mb-12 relative">
        AddArticle.jsx
        <span className="absolute left-0 w-full h-px bg-red-600"></span>
      </h1>

      <div className="bg-[#EAEAEA] w-full max-w-5xl p-12 rounded-sm shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input placeholder="Title" {...register("title", { required: "Title is required" })}
                className="w-full h-14 bg-[#C4C4C4] text-black text-center text-xl placeholder:text-black rounded-sm focus:outline-none" />
              {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <input placeholder="Category" {...register("category", { required: "Category is required" })}
                className="w-full h-14 bg-[#C4C4C4] text-black text-center text-xl placeholder:text-black rounded-sm focus:outline-none" />
              {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category.message}</p>}
            </div>
          </div>

          <div>
            <textarea placeholder="Content" rows="10" {...register("content", { required: "Content is required" })}
              className="w-full bg-[#C4C4C4] text-black p-6 text-xl placeholder:text-black rounded-sm focus:outline-none" />
            {errors.content && <p className="text-red-600 text-xs mt-1">{errors.content.message}</p>}
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-[#7BC9F5] text-black text-2xl px-20 py-3 rounded-sm shadow-md">Post Article</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;