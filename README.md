# OuiSEO

An open-source bookmarklet that shows you on-page SEO and social meta data information.

## Why should I use this?

As an internet marketer you'll often find yourself looking at a website's source code to verify the page's title tag, meta description, see if the Facebook image meta tag was added, look at the text used for the Twitter card, etc. This process is tedious AND time consuming.

OuiSEO was primarily built to save me time (and, let's be honest, to have some fun coding). If you have any ideas or suggestions please [get in touch](https://twitter.com/CarlSednaoui). If anything seems broken please [submit a Github issue](https://github.com/carlsednaoui/ouiseo/issues/new).

__Note:__ OuiSEO is an evolving project and new features may be added in the future.

## Installation

To install OuiSEO simply go [here](http://carlsednaoui.github.io/ouiseo/install.html).

## Demo
![OuiSEO Demo Image 1](http://f.cl.ly/items/202d2s2W2x2y1x2e0K1g/ouiseo_demo_1.png)
![OuiSEO Demo Image 2](http://f.cl.ly/items/0o04060g0x301m3E3w16/ouiseo_demo_2.png)
![OuiSEO Demo Image 3](http://f.cl.ly/items/2F1Q293i2w0R1R2v2m2G/ouiseo_demo_3.png)
![OuiSEO Demo Image 4](http://f.cl.ly/items/0X421F1o1I0k0m0u2x0A/ouiseo_demo_4.png)


## Inspiration

OuiSEO is greatly inspired by this [SEO Bookmarklet](http://twkm.ca/seo-bookmarklet/) made by Troy Meier. Thank you Troy!

## Resources

### Facebook Resources
- [Open graph documentation](https://developers.facebook.com/docs/opengraph/)
- [Undestanding Facebook object types](https://developers.facebook.com/docs/opengraph/creating-object-types/)
- [Facebook Open Graph Debugger](https://developers.facebook.com/tools/debug)
- [The Open Graph protocol](http://ogp.me/)

### Twitter Resources
- [Twitter Cards Documentation](https://dev.twitter.com/docs/cards)
- [Twitter Cards Validator](https://dev.twitter.com/docs/cards/validation/validator)

## [License](http://opensource.org/licenses/MIT)

>The MIT License (MIT)
>
>Copyright (c) <year> <copyright holders>
>
>Permission is hereby granted, free of charge, to any person obtaining a copy
>of this software and associated documentation files (the "Software"), to deal
>in the Software without restriction, including without limitation the rights
>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>copies of the Software, and to permit persons to whom the Software is
>furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in
>all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
>THE SOFTWARE.

## Facebook Open Graph Notes
- Fb url: The URL should be the canonical address for the given page
- Fb title: The title should typically match page title
- Fb description: A short description or summary of the object
- Fb type: Tells Facebook how you'd like your website to be categorized. You can find [more info here](https://developers.facebook.com/docs/reference/opengraph/object-type/)
    - __Note__: The og:type meta tag is necessary for Facebook to render a News Feed story that generates a high click-through rate
- Fb img: The URL of an image for this Open Graph object. They suggest that you give them an image of at least 200x200 pixels. However, bigger is better, so if you have a 1500x1500 image that you can use, use that instead (Note: image sizes must be no more than 5MB in size.)

## TODO
- Refactor JS
- Create minified version
- Check if they use KM, GA, Mixpanel, Optimizely, VWO, MouseFlow, Google Remarketing, AdRoll, CrazyEgg
- Add 'SEO' score?
- Add 'SEO' suggestions?
