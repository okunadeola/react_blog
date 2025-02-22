/* eslint-disable react/prop-types */




const ListBlock = ({ block }) => {
    const { style, items } = block.data;
    const isOrdered = style === 'ordered';
  
    return (
      <>
        {isOrdered ? (
          <ol className="list-decimal ml-6 mb-4">
            {items.map((item, index) => (
              <li key={index}>
                <span
                  dangerouslySetInnerHTML={{ __html: item?.content || item }}
                />
              </li>
            ))}
          </ol>
        ) : (
          <ul className="list-disc ml-6 mb-4">
            {items.map((item, index) => (
              <li key={index}>
                <span
                  dangerouslySetInnerHTML={{ __html: item?.content || item }}
                />
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };


  export default ListBlock