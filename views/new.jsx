const React = require('react')
const Default = require('./layouts/default')

function New ({bakers}) {
    return (
      <Default>
        <h2>Add a new bread</h2>
        <form action='/breads' method='POST'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
          />
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            id="image"/>
          <label htmlFor="hasGluten">Has Gluten?</label>
          <input
            type="checkbox"
            name="hasGluten"
            id="hasGluten"
            defaultChecked
          />
          <label htmlFor="baker">Baker</label>
          <select name="baker" id="baker">
            {bakers.map(baker => {
              return(
                <option key={baker._id} value={baker._id}>{baker.name}</option>    
              )
            })}        
          </select>
          <br />
          <input type="submit"/>
        </form>
        <div>
            <a href='/breads'>
                <button>Back</button>
            </a>
        </div>
      </Default>
    )
}

module.exports = New
