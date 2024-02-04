export default function SectionHeading({ children }: React.PropsWithChildren) {
  return (
    <h2 className="mb-8 text-center text-3xl font-medium capitalize">
      {children}
    </h2>
  )
}
