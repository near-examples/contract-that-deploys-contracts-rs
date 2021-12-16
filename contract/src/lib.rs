/*
* This is an example of a Rust smart contract with two simple, symmetric functions:
*
* 1. set_greeting: accepts a greeting, such as "howdy", and records it for the user (account_id)
*    who sent the request
* 2. get_greeting: accepts an account_id and returns the greeting saved for it, defaulting to
*    "Hello"

* Learn more about writing NEAR smart contracts with Rust:
* https://github.com/near/near-sdk-rs
*
*/

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::json_types::U128;
use near_sdk::{env, near_bindgen, setup_alloc, AccountId, Balance, Promise};
setup_alloc!();

// Structs in Rust are similar to other languages, and may include impl keyword as shown below
// Note: the names of the structs are not important when calling the smart contract, but the function names are
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct ContractThatDeploysContracts {
    records: LookupMap<String, String>,
}

impl Default for ContractThatDeploysContracts {
    fn default() -> Self {
        Self {
            records: LookupMap::new(b"a".to_vec()),
        }
    }
}

#[near_bindgen]
impl ContractThatDeploysContracts {
    pub fn deploy_contract_code(account_id: AccountId) {
        Promise::new(account_id)
            .create_account()
            .transfer(17490000000000000000000000)
            .add_full_access_key(env::signer_account_pk())
            .deploy_contract(include_bytes!("../../wasmFile/main.wasm").to_vec());
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 *
 * To run from contract directory:
 * cargo test -- --nocapture
 *
 * From project root, to run in combination with frontend tests:
 * yarn test
 *
 */
