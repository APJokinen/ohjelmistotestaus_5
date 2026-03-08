
import { test, expect } from '@playwright/test'; 

test.describe('Dog image', () => {
    test('Should retrieve dog image on page load', async({page}) => {
        await page.goto('/')
        const responsePromise = page.waitForResponse('**/api/dogs/random')
        
        const imgLocator = page.getByAltText('Random dog')
        await expect(imgLocator).toHaveAttribute('src')
        
        const sourceText = await imgLocator.getAttribute('src')
        expect(sourceText).toContain('https://')
    })

    test('Should retrieve dog image on click', async({page}) => {
        await page.goto('/')
        const responsePromise = page.waitForResponse('**/api/dogs/random')
        await page.getByRole('button', {name: 'Get Another Dog'}).click()
        await responsePromise
        const imgLocator = page.getByAltText('Random dog')
        await expect(imgLocator).toHaveAttribute('src')
        
        const sourceText = await imgLocator.getAttribute('src')
        expect(sourceText).toContain('https://')

    })

    test('Should return error when API call fails', async({page}) => {
        await page.route('**/api/dogs/random', async (route) => { 
         await route.abort(); 
        });
         await page.goto('/');

         const errorElement = page.getByText(/error/i)
        await expect(errorElement).toBeAttached()
        await expect(errorElement).toBeVisible()



    })

})