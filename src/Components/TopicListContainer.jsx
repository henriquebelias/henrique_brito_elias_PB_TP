export function TopicListContainer({ posts }) {
  return (
    <section className="flex flex-col gap-3 border border-black lg:col-span-2 p-3">
      <h2>Lista de Tópicos</h2>
      <div>
        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
            </div>
          ))}
      </div>
    </section>
  );
}
