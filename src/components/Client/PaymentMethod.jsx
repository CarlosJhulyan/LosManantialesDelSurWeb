import React from "react";

const PaymentMethod = ({ images = [], numbers = [] }) => {
  return (
    <section className="payment-methods">
      <div className="payment-methods__images">
        {
          images.map((image, i) => <img key={i} src={image} alt={`Imagen de ${image}`} />)
        }
      </div>
      <div className="payment-methods__numbers">
        {
          numbers.map((number, i) => <p key={i}>{number}</p>)
        }
      </div>
    </section>
  )
}

export default PaymentMethod;