# How to use CSPR.click with NextJS (SSR)

If you're using NextJS and his server side rendering (SSR) feature, to use cspr.click library you'll need to import it on the client side.
cspr.click uses Styled component and React-modal, 2 libraries that use browser functions. It is therefore necessary to load cspr.clik on the client side

## Set up the cspr.click provider / styled component context

### ClickProvider

To load a library on the client side on NextJS, you'll need to use the `dynamic` feature of NextJS (more details here : https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic

This fonction allow us to load components on the client side. Here we need to load first the `ClickProvider` :

    const  ClickProvider  =  dynamic(
    	() => import("@make-software/csprclick-ui").then(mod  => {
    				return  mod.ClickProvider;
    	}),
    	{
    	ssr:  false,
    	}
    );

Using `ssr:  false` is important, this enable to load the component on the client side.

Then you can use the component like a classic component on your code :

    <ClickProvider  options={clickOptions}>

### Styled Component theme provider

As the cspr.click theme is included on the `@make-software/csprclick-ui` lib, you also need to load it on the client side. This case, isn't a component so we can't use the `dynamic` import.
We'll need to load the theme in a `useEffect` and set it on the state like that :

    const [theme, setTheme] =  useState();
    useEffect(() => {
    	import("@make-software/csprclick-ui").then(mod  => {
    		setTheme(mod.CsprClickThemes.light);
    	}),
    	{
    		ssr: false,
    	};
    }, []);

And then you can use the theme like a normal props :

    <ThemeProvider theme={theme}>

You'll maybe need to conditionally render your component in function of is the theme is `undefined` (default state) like :

    if(!theme){
        return <p>Loading</p>
    }

You can also add a loader during the import as it's a promise, you can control the state and set the loading to false when the theme is finally loaded.

## React-modal

If you use a custom `_app.tsx` file, you'll maybe need to add a root div to your app containing the `root` id. Cspr.click use React-modal and react modal need a root element with the id `root` to display the modal. You can wrap your app / component like that :

    <div id="root">
    	<ClickProvider options={clickOptions}>
    		<ThemeProvider theme={theme}>
    			<Component {...pageProps}  />
    		</ThemeProvider>
    	</ClickProvider>
    </div>
