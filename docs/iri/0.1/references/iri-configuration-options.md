# IRI configuration options

This table contains the configuration options for the IRI.

You can choose to configure the IRI by specifying the configuration options in the following ways:
* As flags in the command line
* As parameters in a file with the .iri extension (IRI configuration file)

| **Configuration options** |   **Description**| **Accepted values** | **Default values**|**Notes** |
| :------------------------ | :--------------- | :--------- | :--------| :------------|
|<a name="alpha"></a>`--alpha`| Randomness of the tip selection process             |   number between 0 and infinity  |  0.001     | The number 0 is the most random and infinity is the most deterministic|
|<a name="api-host"></a> `--api-host`| Host on which the API will listen to| string|localhost | Set this parameter to 0.0.0.0 to accept any host|
|<a name="cache-size"></a>`--cache-size` |Size of the network cache in bytes | |150,000 | |
|<a name="db"></a>`--db` |The database that's used to store transactions  | string | rocksdb | Currently, the only supported database is RocksDB|
|<a name="db-cache-size"></a>`--db-cache-size` |Size of the database cache in kilobytes | |100,000 | |
|<a name="db-log-path"></a>`--db-log-path` |File where the database logs are saved | string |mainnet.log| |
|<a name="db-path"></a> `--db-path`| Folder where the database saves data|string |mainnetdb | |
|<a name="dns-refresher"></a>`--dns-refresher` |Reconnect to neighbors that have dynamic IP addresses |boolean |true |
|<a name="dns-resolution"></a>`--dns-resolution` |Enable DNS for neighbor peering |boolean |true |
|<a name="export"></a>`--export` | Enable the export of transaction data to files| boolean|false |
|<a name="ixi-dir"></a>  `--ixi-dir` |Folder where ixi modules should be added for automatic discovery by IRI |string |ixi |
|<a name="max-analyzed-transactions"></a>`--max-analyzed-transactions` |Maximum number of unconfirmed transactions that may be analyzed during the tip selection process to find the latest milestone that a transaction approves |number |20,000 |
|<a name="max-body-length"></a> `--max-body-length` | Maximum number of characters that the body of an API call may contain|number |1,000,000 | If a request body length exceeds this number, an error is returned
|  <a name="maxdepth"></a>`--max-depth` |Maximum number of previous milestones from where you can start the tip selection |number |15 | This value should be both small enough to allow the weighted random walk to finish in a reasonable amount of time and large enough in include enough new transactions in the [subgraph](/concepts/tip-selection.md#subgraph)
|<a name="max-find-transactions"></a>`--max-find-transactions` |Maximum number of transactions that may be returned by the findTransactions API call |number | 100,000 | If the number of transactions exceeds this number, an error is returned 
|<a name="max-get-trytes"></a>`--max-get-trytes` |Maximum number of trytes that may be returned by the getTrytes API call  |number |10,000 | If the number of transactions found exceeds this number, an error is returned
|<a name="max-peers"></a>`--max-peers` |Maximum number of non-mutually-tethered connections |number |0 |This option is available only on the IOTA testnet network
|<a name="max-requests-list"></a>`--max-requests-list` |Maximum number of parameters in an API call |number |1,000 | If the number of parameters exceeds this number, an error is returned
|<a name="neighbors"></a>`-n`, `--neighbors` |Urls and IP addresses of [neighbor nodes](/iri/how-to-guides/finding-neighbors.md) |array of strings |[ ] |
|<a name="p-drop-cache"></a>`--p-drop-cache` |Probability of losing recently seen transactions in the network cache | number between 0 and 1|0.02 |
|<a name="p-drop-transaction"></a>  `--p-drop-transaction`|Probability of losing a received transaction |number between 0 and 1 |0.0 | This option is available only on the IOTA testnet network
|<a name="p-propagate-request"></a>`--p-propagate-request` |Probability of the IRI requesting a missing transaction from a neighbor | number|0.01 | This number should be low to avoid the IRI requesting non-existing transactions that spam the network
|<a name="p-remove-request"></a>`--p-remove-request` |Probability of the IRI stopping to request a transaction |number between 0 and 1 |0.01 |This number should be close to 0 so that non-existing transaction hashes are eventually removed
|<a name="p-reply-random"></a>`--p-reply-random` |Probability of the IRI replying to a random transaction request, even if the IRI doesn't have anything to send|number between 0 and 1 | 0.66|
|<a name="p-select-milestone"></a>`--p-select-milestone`| Probability of the IRI requesting a milestone transaction from a neighbor|number between 0 and 1 | 0.7|This number should be a large because it's essential that the IRI finds milestones in order to consider transactions confirmed
|<a name="p-send-milestone"></a>`--p-send-milestone` |Probability of the IRI sending a milestone transaction as a random transaction to its neighbors | number between 0 and 1 | 0.02|
|<a name="port"></a>`--port, -p` (**required**) |Port that will be used by the API |string |14265 |
|<a name="queue-size"></a>`--queue-size `|Size of the REPLY, BROADCAST, and RECEIVE network queues | number|1,000 |
|<a name="remote"></a> ` --remote `|Open the API interface to any host |boolean | false| When set to true, this option is equivalent to setting the API-HOST option to 0.0.0.0
|<a name="remote-auth"></a>`--remote-auth` |Basic authentication for API calls in the form of username:password  | string| ""|
|<a name="remote-limit-api"></a>`--remote-limit-api` |API calls that the IRI must ignore |array of strings |[ ] | 
|<a name="rescan"></a> `--rescan`|Rescan all transaction metadata (Approvees, Bundles, and Tags) |boolean |false |
|<a name="revalidate"></a>`--revalidate` |Reload from the database data about confirmed transaction (milestones), state of the ledger, and transaction metadata | boolean| false|
|<a name="send-limit"></a> `--send-limit` |Maximum number of packets that may be sent by the IRI in a one-second interval |number | -1|If this number is below 0 then there is no limit
|<a name="tcp-receiver-port"></a>`-t`, `--tcp-receiver-port` |Port from which the IRI receives TCP data packets from neighbors |string | 15600|
|<a name="udp-receiver-port"></a>`-u`, `--udp-receiver-port` |Port from which the IRI receives UDP data packets from neighbors |string |14600 |
|<a name="zmq-enabled"></a>  `--zmq-enabled` | Enable [zero message queue](/iri/concepts/zero-message-queue.md) subscriptions| boolean|false |
|<a name="zmq-ipc"></a>`--zmq-ipc` |Path that is used to communicate with ZMQ in IPC| string|  ipc://iri|
|<a name="zmq-port"></a> `--zmq-port `|Port that is used to connect to the ZMQ feed |string | 5556|
|<a name="local-snapshots-enabled"></a>`LOCAL_SNAPSHOTS_ENABLED`   | Enable [local snapshots](/iri/concepts/local-snapshot.md) |boolean  | true  | This parameter must be set to `true` for the IRI to read any other `LOCAL_SNAPSHOTS` parameters|
|<a name="local-snapshots-pruning-enabled"></a>`LOCAL_SNAPSHOTS_PRUNING_ENABLED`  |  Enable the deletion of confirmed transactions from the ledger  | true | Confirmed transactions are deleted if they were confirmed by a milestone that is older than the sum of `LOCAL_SNAPSHOTS_DEPTH` + `LOCAL_SNAPSHOTS_PRUNING_DELAY`.  |
|<a name="local-snapshots-depth"></a>`LOCAL_SNAPSHOTS_DEPTH`  | Amount of milestone transactions to keep in the ledger | number starting from 100 | 100 | |
|<a name="local-snapshots-pruning-delay"></a>`LOCAL_SNAPSHOTS_PRUNING_DELAY`  | Amount of milestone transactions to keep in the ledger   | number starting from 50,000  | 50,000 |  |
|<a name="local-snapshots-internal-synced"></a>`LOCAL_SNAPSHOTS_INTERVAL_SYNCED`  | Interval, in milestone transactions, at which local snapshots are taken if the ledger is fully synchronized  |number| 10   | |
|<a name="local-snapshots-internal-unsynced"></a>`LOCAL_SNAPSHOTS_INTERVAL_UNSYNCED`   | Interval, in milestone transactions, at which local snapshots are taken if the ledger is not fully synchronized  |number| 1,000  | |
|<a name="local-snapshots-base-path"></a>`LOCAL_SNAPSHOTS_BASE_PATH`  |  Path to the snapshot file, without the file extension. |  string |  mainnet   | Prepends the `.snapshot.meta` and `.snapshot.state` files with the value of this parameter. For the default value, the files are named `mainnet.snapshot.meta` and `mainnet.snapshot.state`. You can specify a directory for the files to be added to by doing the following: `<directory name>/<file name>`, which results in `folderpath/filename.snapshot.meta`. | |
