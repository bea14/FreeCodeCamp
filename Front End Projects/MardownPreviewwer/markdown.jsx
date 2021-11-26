{/* Header */}
const Header = () => (
    <header className='header row'>
      <div className="col-xs-12">
      <h1 className='text-center'>
        Markdown Previewer
      </h1>
      <hr />
      </div>
    </header>
  );
  
  {/* Initial Markdown text that should appear */}
  const INITIAL_MARKDOWN =  `# Markdown syntax guide
  
  ## Headers
  
  # This is a Heading h1
  ## This is a Heading h2 
  ###### This is a Heading h6
  
  ## Emphasis
  
  *This text will be italic*  
  _This will also be italic_
  
  **This text will be bold**  
  __This will also be bold__
  
  _You **can** combine them_
  
  ## Lists
  
  ### Unordered
  
  * Item 1
  * Item 2
  * Item 2a
  * Item 2b
  
  ### Ordered
  
  1. Item 1
  1. Item 2
  1. Item 3
    1. Item 3a
    1. Item 3b
  
  ## Images
  
  ![This is a alt text.](/image/sample.png "This is a sample image.")
  
  ## Links
  
  You can visit my codepen [Bea14](https://codepen.io/bea14-the-lessful).
  
  ## Blockquotes
  
  > Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
  >
  >> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.
  
  ## Tables
  
  | Left columns  | Right columns |
  | ------------- |:-------------:|
  | left foo      | right foo     |
  | left bar      | right bar     |
  | left baz      | right baz     |
  
  ## Blocks of code
  
  \`\`\`
  let message = \'Hello world\';
  alert(message);
  \`\`\`
  
  ## Inline code
  
  This web site is using \`markedjs/marked\`.
  
     `
  
  {/* Footer */}
  const Footer = () => (
    <footer className='row'>
      <div className="col-xs-12">
      <hr />
      <p className='text-center'>
        Markdown Previewer created by <a href='https://codepen.io/bea14-the-lessful' target='_blank' className='text-warning'>bea14</a>
      </p>
      </div>
    </footer>
  );
  
  
  {/*Allows line breaks with return button*/}
  marked.setOptions({
    breaks: true
  });
  
  {/* React component */}
  class Markdown extends React.Component {
      constructor() {
        super();
        this.state = {
        value: INITIAL_MARKDOWN,
        };
      }
    
      createMarkup() {
          return { __html: marked(this.state.value)};
      }
    
      handleChange(event) {
          this.setState({ value: event.target.value });
      }
  
      render() {   
       return (
          <div className="row">
              <div className="col-md-6">
                  <h2 className="text-center">Markdown Input</h2>
                  <textarea type='text' defaultValue={this.state.value} onChange={this.handleChange.bind(this)} id='editor' className='input'/>
              </div>
              <div className="col-md-6">
                  <h2 className="text-center">Preview</h2>
                  <div className='output' id='preview' dangerouslySetInnerHTML={this.createMarkup()} />
              </div>
          </div>    
       );
      }
  }
  
   {/* stateless functionnal component*/}
  const MarkdownPreview = () => (
    <div className='container'>
      <Header />
      <Markdown />
      <Footer />
    </div>
  );
  
  document.write('<div id="app"></div>');
    {/* Render html elements */}
  ReactDOM.render(<MarkdownPreview />, document.getElementById('app'));