import React, { useState } from "react";
// const PortableText = require('@sanity/block-content-to-react')

const SummaryDetail = ({ summary, detail }) => {
  const [active, setActive] = useState();

  const _className = active ? "is-active" : "";

  return (
    <div className={`summary-detail ${_className}`}>
      <div className='summary' onClick={() => setActive(!active)}>
        {summary}
      </div>
      <div className='detail'>{/* <PortableText blocks={detail} /> */}</div>
    </div>
  );
};

export default SummaryDetail;
