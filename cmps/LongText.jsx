export class LongText extends React.Component {
    state = {
        text: this.props.desc,
        isLongTextShown: this.props.isLongTextShown
    }
    toggleShowFullText = () => {
        this.setState({isLongTextShown: !this.state.isLongTextShown})
    }
    render() {
        const { text } = this.state        
        const { isLongTextShown } = this.state        
        return (
            <span>
                {isLongTextShown ? `${text}` : `${text.slice(0,100)}...`}
                <button className="btn-show-more-less" onClick={this.toggleShowFullText}>
                    {isLongTextShown ? 'show less' : 'show more'}
                </button>    
            </span>
        )
    }
}