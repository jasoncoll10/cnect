export default function CardPage({ id }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#070709",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      color: "#f0eef8"
    }}>
      <h1 style={{ fontSize: 36, marginBottom: 16 }}>✦</h1>
      <p style={{ fontSize: 20, marginBottom: 8 }}>Card: {id}</p>
      <p style={{ color: "rgba(240,238,248,0.5)" }}>This card is ready 🖤</p>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  return { props: { id: params.id } }
}
