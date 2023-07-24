const React = require('react')
const Default = require('./layouts/default')

function Show ({bread}) {
    return (
      <Default>
        <h2>Show Page</h2>
        <h3>{bread.name}</h3>
        <p>
            and it
            {bread.hasGlutenParagraph()            }
            have gluten
        </p>
        <p>{bread.getBakedBy()}</p>
        <img src={bread.image} alt={bread.anme} />
        <a href={`/breads/${bread._id}/edit`}>
          <button>Edit</button>
        </a>
        <form action={`/breads/${bread._id}?_method=DELETE`} method='POST'>
          <input type='submit' value='DELETE' />
        </form>
      </Default>
    )
}

module.exports = Show