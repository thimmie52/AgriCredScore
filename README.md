# AgriCredScore

Several sectors, both public and private all contribute to the growth and sustenance of the Nigerian economy with **Agriculture** being a significant benefactor of this development. While it stands as a crucial sector in the economy, **Agriculture** still faces major hindrances that negatively affect youth participation and productivity. </br>

Access to finance is greatly considered as one of the key factors to enhance the youth productivity and overall participation in agricultural activities however the youth are still unable to obtain entry. Seamless acquisition of substantial funding and other means of financial aid towards the yield of agricultural investment comes as a solution to this problem but commercial banks and other financial institutions shy away from the agricultural field because of its high-risk influences such as climate changes, land tenure issues and most importantly **credit history**. </br>

To bridge this financial gap and make agriculture a more profitable and appealing field to the youth, a data-driven result is presented thus: </br>

## Data Strategy
In order to compel the investors to invest in the agripreneur's enterprise, several data such as the demographical information, farm characteristics and financial history — which in turn gives insights into the agripreneur's creditworthiness, has to properly be presented for the investor's consumption. Deplorably, detailed data on the financial habits of agripreneurs in Nigeria is not substantially available however there are several generic reports that give understanding as to the nature of these agripreneurs' financial patterns. </br>

A youth in Nigeria is typically described as one between the age of 18 to 35. In a study by Agboola Uthman O et al, they describe the Nigerian agricultural space as a sector dominated by [aged and inactive farmers](https://biomedres.us/fulltexts/BJSTR.MS.ID.003792.php), this fact backs the claim for the need for more youth in the industry to ensure its long term sustenance. </br>
Each state in the 6 geopolitical zones of the country comes with the crop type and livestock that are more likely to bring bountiful yield due to the favourable climate and land tenure in the state in question. Based on Wikipedia reports from national resources, this is an overview of the states and their major yields: </br>

| **Region/Zone**               | **States Covered**                                    | **Major Crops**                                              | **Major Livestock**           |
| ----------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ | ----------------------------- |
| **North West**                | Kano, Kaduna, Katsina, Sokoto, Kebbi, Jigawa, Zamfara | Millet, sorghum, maize, rice, groundnut, cotton, beans       | Cattle, goats, sheep, poultry |
| **North East**                | Borno, Yobe, Adamawa, Bauchi, Gombe, Taraba           | Millet, maize, cowpea, groundnut, sesame, sorghum            | Cattle, goats, sheep          |
| **North Central**             | Niger, Kwara, Kogi, Benue, Nassarawa, Plateau, FCT    | Yam, cassava, maize, rice, sesame, soybeans                  | Cattle, goats, poultry, pigs  |
| **South West**                | Lagos, Ogun, Osun, Ondo, Oyo, Ekiti                   | Cocoa, cassava, maize, oil palm, plantain, vegetables        | Goats, pigs, poultry          |
| **South East**                | Abia, Imo, Ebonyi, Anambra, Enugu                     | Cassava, yam, rice, oil palm, vegetables                     | Goats, poultry, pigs          |
| **South South (Niger Delta)** | Rivers, Bayelsa, Delta, Akwa Ibom, Edo, Cross River   | Oil palm, cassava, plantain, rice, rubber, cocoa, vegetables | Poultry, pigs, goats          | </br>

With such data, an investor is aimed to have a better comprehension to their expectations when crediting an agripreneur with a loan. </br>

In addition to the demographical data, financial patterns which ar every paramount in loan crediting were researched for further insights. In a [GSC Advanced Research and Reviews publication](https://gsconlinepress.com/journals/gscarr/sites/default/files/GSCARR-2024-0370.pdf), it was realised that over 35% of agripreneurs are able to repay loans while 60% default at payment due to **lack of motivation** from the amount of credit given to them by financial institutions. Some of these agripreneurs claim the need for higher amounts of credits due to the operational capabilities employed at their farms such as having to hire external workers, transportation and acquisition/sustenance of farm equipment and materials. </br>

Given these sources and the nature of the problem, it was realised that there needs to be a bridge between agripreneurs and investors to understand better the stakes of the loan credited and where best to credit these loans for timely and profitable payback. Our solution proposes the use of visualisations/scoring models that assess the likelihood of young farmers to succeed or repay loans and insights into what makes a farmer **"low risk"** or **"investment-ready"**. </br>

After further research, it was found that the key features that reflect agripreneurs' financial behaviour, operational capability and risk factors are:
1. Demographics
   - Age
   - Gender
   - Education level
   - Marital status
   - Location (Region/State)
2. Farm Characteristics
   - Farm size
   - Crop type(s) grown
   - Livestock type/number
   - Irrigation system
   - Number of crop cycles per year
   - Use of technology
3. Financial History
   - Previous loan(s) taken
   - Loan amount
   - Repayment status
   - Savings behavior
   - Access to financial institutions
   - Income from farming
   - Credit Score
4. Operational Capability
   - Access to extension services/training
   - Market access
   - Yield or revenue per season
   - Input usage (seeds, fertilizer, pesticides)
   - Labour used </br>
As mentioned earlier, detailed data on key features such as the above mentioned are unfortunately scarce, however through the process of rigorous reverse engineering, data based on reports and publications reflecting the nature of distribution of the above were used to generate data. </br>

### Data Design and Generation
The data was generated programmatically using Python libraries (pandas, numpy, random). Core logic thus:

1. Demographics
Each region was mapped to its respective states, crops, and livestock. Age was randomly sampled between [18–35](https://en.wikipedia.org/wiki/Youth_in_Nigeria#:~:text=Youth%20in%20Nigeria%20includes%20citizens,age%20of%2015%20and%2035.) based on the nationwide consideration of the age range of youth. Gender and education distributions were roughly balanced based on [national youth demographic data](https://www.researchgate.net/publication/350366662_Male_and_Female_Employment_in_Agriculture_and_Agricultural_Productivity_in_Nigeria).

2. Farm Characteristics
Farm size followed a right-skewed distribution whereby the majority were smallholders with less than [5 hectares of farmland](https://openknowledge.fao.org/server/api/core/bitstreams/1775a0a9-8796-4fee-bcc2-759ff92759fc/content#:~:text=The%20national%20average%20size%20of%20household%20farm,of%20the%20land%20that%20non%2Dsmall%20producers%20do.). Technology use and irrigation were influenced by region and farm size resulting in a 50/50 distribution for both features. Annual income and yield were correlated with farm size, crop cycles, and technology use.

3. Financial History
The base annual income of agripreneurs was found to be be an average of [NGN300,000](https://www.ajol.info/index.php/naj/article/view/189491/178719#:~:text=The%20mean%20annual%20farm%20income,Naira%20and%20146%2C807%20Naira%20respectively.) hence a normal distribution of this value was taken into account for the realistic generation of this data. The loan amount was designed based on the agripreneur's income whereby the agripreneur with higher income will most likely have a more positive loan history. Repayment status was designed to correlate with savings behaviour, technology use (better yields = better repayment), previous loan history and market access. Hence, credit Scores were generated based on a weighted combination of the agripreneur's annual income, loan amount, repayment status and saving behaviour along with the `350 - 800` scale of allocating credit scores in Nigeria. </br>

### Farmer Finance Profile
An [AgriCredScore system](http://agricredscore.onrender.com) was designed, to store in a secured database, the profile of each farmer who signs up for a loan or other financial assistance. The system takes into account the above mentioned key features from each farmer and displays to the potential investor a generic visualisation of the demographical data, farm characteristics and financial patterns of all registered farmers on the platform along with a **detailed AI recommendation** of the farmer for further understanding of the risks or worthiness of investing into the farmer in question. </br>

### Predictive Model
To develop a predictive model for assessing the creditworthiness and loan repayment likelihood of young Nigerian agripreneurs, the following steps were taken:
1. Feature Engineering
- Key categorical features (e.g., gender, crop type, region) were encoded numerically using `LabelEncoder`.
- The `Credit_Score` was computed using a formula weighted by income, loan size, savings behavior, and repayment history, with added random noise for realism.
- `Loan_Repaid` was derived as a probabilistic function of the credit score, scaled to represent percentage likelihood.

2. Model Building
A **MultiOutputRegressor** with a `RandomForestRegressor` base was trained to simultaneously predict:
- `Credit_Score` (continuous value between 300-850)
- `Loan_Repaid` (repayment likelihood as a percentage)
The dataset was them split into training and test sets (80/20 split), and the model was evaluated using **R² and MSE** metrics.

3. Evaluation & Export
- The final model achieved an R² of **0.94** for credit score prediction suggesting that the predictions are highly accurate and that the features used (especially income, savings, repayment history, and loan amount) are strong predictors of creditworthiness **AND** **0.81** for loan repayment probability suggesting that the model considers variability in repayment likelihood.
- The trained model was exported using `joblib` for integration into the [AgriCredScore](http://agricredscore.onrender.com) application.
