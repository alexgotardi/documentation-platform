import React from 'react'
import styled, { css } from 'styled-components'
import logo from './../../assets/Logo.svg'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuData: []
    }
    /*
    this.state = {
      menuData : [{
        heading: 'Heading 1',
        menuList: ['item1', 'item2', 'item3'],
        expand: false
      }, {
        heading: 'Heading 2',
        menuList: ['item1', 'item2', 'item3'],
        expand: false
      }, {
        heading: 'Heading 3',
        menuList: ['item1', 'item2', 'item3'],
        expand: false
      }]
    } */
    this.handleHeadingClick = this.handleHeadingClick.bind(this)
  }
  componentDidMount() {
    let data = Object.values(this.props.data).map(obj => {
      let versionsNbrs = Object.keys(obj.versions)
      let latestVersion = versionsNbrs[versionsNbrs.length - 1] // get the last version
      console.log(obj.versions[latestVersion])
      let menuList = obj.versions[latestVersion].map(({name, link}) => name.split("\\")[name.split("\\").length - 1])
      return { expand: false, heading: obj.name, menuList }
    })
    this.setState({
      menuData: data
    })
  }
  handleHeadingClick(index) {
    this.setState((state, props) => {
      return {
        menuData:
        state.menuData.map((item, ind) =>
        (ind == index ?
          {...item, expand: !item.expand} :
          {...item, expand: false}
        ))
      };
    });
  }

  render() {
    return (<section className={`side-menu ${this.props.classes}`} style={this.props.styles}>
  <h4 className="side-menu__caption">
    <span>Navigation</span>
    <i className="fas fa-times" onClick={e => this.props.onCloseClick()}></i>
  </h4>

    {this.state.menuData.map((menuItem, index) => (<section key={index} className={`side-menu__group ${menuItem.expand ? 'side-menu__group--selected' : ''}`}>
      <h5 className="side-menu__heading" onClick={(e) => this.handleHeadingClick(index)}>
        <span>{menuItem.heading}</span>
        <i className={` ${menuItem.expand ? 'fas fa-angle-up' : 'fas fa-angle-down'}`}></i>
      </h5>
      <ul className="side-menu__list">
          {menuItem.menuList.map((menuListItem, miIndex) => (
            <li key={miIndex}>{menuListItem}</li>
          ))}
      </ul>
    </section>))}
</section>)
  }
}
 export default Menu
