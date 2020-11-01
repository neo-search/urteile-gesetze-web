const SectionNormWithContent = ({ doc }) => {
  const { abkuerzung, content } = doc

  const contentWithImages = content
  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', paddingBottom: 40, paddingTop: 40 }}>
        <b>{abkuerzung}</b>
        {doc.titel ? ' ' + doc.titel : ''}
      </h2>

      <div
        dangerouslySetInnerHTML={{ __html: contentWithImages }}
        style={{ paddingBottom: 20 }}
      ></div>
      <hr />
    </div>
  )
}

export default SectionNormWithContent
