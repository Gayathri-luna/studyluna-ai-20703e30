import { interests } from "../data/interests";

export default function InterestsPage() {
  return (
    <div>
      <h1>Interests</h1>
      <ul>
        {interests.map((item) => (
          <li key={item.slug}>
            <a href={`/interests/${item.slug}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
