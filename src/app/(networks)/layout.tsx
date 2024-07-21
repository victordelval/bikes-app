type Props = {
  children: React.ReactNode;
};

export default function NetworksLayout({ children }: Props) {
  return <main className="flex h-screen overflow-hidden">{children}</main>;
}
