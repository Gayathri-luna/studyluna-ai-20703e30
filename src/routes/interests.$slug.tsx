import { interests } from "../data/interests";
import { useParams } from "@remix-run/react";

export default function InterestDetail() {
  const { slug } = useParams();
  const item = interests.find((i) => i.slug === slug);

  if (!item) {
    return <p>Interest not found.</p>;
  }

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <h3>Free Resources</h3>
      <ul>
        {item.resources.map((res) => (
          <li key={res}>
