# Troubleshooting Trinity

This page contains a guide to help you fix common or known issues that you may find while using Trinity.

## Incorrect balance

If Trinity can't connect to an IRI node, it may have an outdated view of transactions on the network. This view can cause Trinity to display an incorrect balance. Therefore, Trinity retains a list of locally generated addresses so it can be manually re-synchronized.

If you think you're balance is wrong (and a [global snapshot](how-to-guides/performing-a-snapshot-transition.md) hasn't occurred), you can manually sycnhronize it by going to **Settings** > **Account** > **Account management** > **Tools** > **Sync account**.

![Manual update](../sync.jpg) 

## Pending transaction

When you send a transaction, it has a pending status until it's confirmed.

If a transaction is pending for a long time, make sure that the [Auto-promotion setting](how-to-guides/changing-the-advanced-settings.md) is set to **Enabled**.

**Note:** Auto-promotion is availble on mobile devices only when Trinity is in the foreground.

## Unable to send a transaction

Trinity may stop you from sending a transaction for any of the following reasons:

* For security reasons IOTA addresses should be spent from only once. If you have funds on an address that has already been spent from, Trinity stops you spending from that address to protect your funds.
* If the address you are sending to has been spent from before, Trinity will prevent you sending to that address to protect the funds. In this case, ask your recipient for a new address.
* If you are making multiple transactions, you may need to wait for your first transaction to be confirmed before making another transaction
  
Please get in touch with us on the #help channel in the official IOTA Discord for further help.

## Lost access to a device

Don’t worry, nobody can access your seed or balance without your password. You can access your funds by installing Trinity on another device and entering your seed backup during the setup.

**Note:** For extra protection in the case of a lost device, please create a new seed and transfer your funds to an address from that seed.