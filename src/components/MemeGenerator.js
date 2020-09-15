import React from 'react'

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            imgURL: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then((res) => {
                const {memes} = res.data
                this.setState({
                    allMemeImgs: memes
                })
            })
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault() //prevent page reload
        const randIndex = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const {url} = this.state.allMemeImgs[randIndex]

        this.setState({
            imgURL: url
        })
    }

    render() {
        return(
            <div>
                <form className='meme-form' onSubmit={this.handleSubmit}>
                    <input name='topText' placeholder='Top Text' type='text' onChange={this.handleChange} value={this.state.topText}/>
                    <input name='bottomText' placeholder='Bottom Text' type='text' onChange={this.handleChange} value={this.state.bottomText}/>
                    <button>Gen</button>
                </form>
                <div className='meme'>
                    <img src={this.state.imgURL} alt='Random Meme Image' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator