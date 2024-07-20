import Link from 'next/link';

type Props = {
  params: { id: string };
};

export default function NetworkDetailsPage({ params }: Props) {
  return (
    <>
      <h1>{params.id.toLocaleUpperCase()}</h1>
      <Link href={'/'}>Back to networks</Link>
    </>
  );
}
